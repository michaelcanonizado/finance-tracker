import { google } from "googleapis";

import { GoogleSheets, IExpense } from "@/interfaces/IMain";

export const getData = async (sheetName: GoogleSheets) => {
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

  return formatGoogleSheetData(rows.data.values!);
};

const formatGoogleSheetData = (rawData: Array<Array<string>>) => {
  rawData.shift();

  // Formats date from 1/2/2024 to Tues, 1/2/2024
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formattedData: IExpense[] = rawData.map((row, index) => {
    const date = new Date(row[1]);

    // Shortens the year further from 2024 to 24 (final date format: 'Tues, 1/2,24')
    let shortYear = date.getFullYear().toString().slice(-2);

    return {
      timestamp: row[0],
      date: date
        .toLocaleString("en-US", dateOptions)
        .replace(/\d{4}/, shortYear),
      category: row[3],
      description: row[4],
      amount: parseFloat(row[2]),
    };
  });

  // Reverse the array to show the recent data first
  return formattedData.reverse();
};
