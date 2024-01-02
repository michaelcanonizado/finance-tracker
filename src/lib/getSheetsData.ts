import { google } from "googleapis";

import { GoogleSheets, ICashFlow } from "@/types/main";

export const getData = async (sheetName: GoogleSheets): Promise<ICashFlow> => {
  const spreadsheetId = process.env.SHEET_ID;
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await google.auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Get metadata
  const metadata = await googleSheets.spreadsheets.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
  });

  // Get rows
  const rows = await googleSheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: sheetName,
  });

  return {
    sheet: sheetName,
    values: formatGoogleSheetData(rows.data.values!, sheetName),
  } as ICashFlow;
};

const formatDate = (date: string): string => {
  // Formats date from 1/2/2024 to Tues, 1/2/2024
  // options is type asserted as it is throwing an error. More infomartion on: https://stackoverflow.com/questions/73563950/what-exactly-is-the-typescript-linter-asking-for-in-this-case-where-an-object-r
  const dateOptions = {
    weekday: "short" as const,
    year: "numeric" as const,
    month: "numeric" as const,
    day: "numeric" as const,
  };

  const dateObj = new Date(date);

  // Shortens the year further from 2024 to 24 (final date format: 'Tues, 1/2,24')
  let shortYear = dateObj.getFullYear().toString().slice(-2);

  return dateObj
    .toLocaleString("en-US", dateOptions)
    .replace(/\d{4}/, shortYear);
};

const formatGoogleSheetData = (
  rawData: Array<Array<string>>,
  sheetName: GoogleSheets,
) => {
  rawData.shift();
  const formattedData = [];

  if (sheetName === GoogleSheets.income) {
    formattedData.push(
      ...rawData.map((row, index) => {
        return {
          timestamp: row[0],
          date: formatDate(row[1]),
          category: row[3],
          description: row[4],
          account: "CASH",
          amount: parseFloat(row[2]),
        };
      }),
    );

    return formattedData.reverse();
  } else if (sheetName === GoogleSheets.expenses) {
    formattedData.push(
      ...rawData.map((row, index) => {
        return {
          timestamp: row[0],
          date: formatDate(row[1]),
          category: row[3],
          description: row[4],
          amount: parseFloat(row[2]),
        };
      }),
    );

    return formattedData.reverse();
  }
};
