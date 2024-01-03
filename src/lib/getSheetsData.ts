import { GoogleSheets, ICashFlow } from "@/types/main";

import { authenticateGoogleSheets } from "./authenticateGoogleSheets";

export const getData = async (sheetName: GoogleSheets): Promise<ICashFlow> => {
  // Authenticate google sheets and get instances
  const [googleSheets, auth, spreadsheetId] = await authenticateGoogleSheets();

  // Get rows from the sheet
  const rows = await googleSheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: sheetName,
  });

  // Format the values fetched from the sheet
  const formattedData = formatGoogleSheetData(rows.data.values!, sheetName);

  return {
    sheet: sheetName,
    values: formattedData.values,
    total: formattedData.total,
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

  // Total income/expenses accumulator of the values fetched
  let totalAmount = 0;

  if (sheetName === GoogleSheets.income) {
    formattedData.push(
      ...rawData.map((row, index) => {
        totalAmount += parseFloat(row[2]);
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
  } else if (sheetName === GoogleSheets.expenses) {
    formattedData.push(
      ...rawData.map((row, index) => {
        totalAmount += parseFloat(row[2]);
        return {
          timestamp: row[0],
          date: formatDate(row[1]),
          category: row[3],
          description: row[4],
          amount: parseFloat(row[2]),
        };
      }),
    );
  }

  return { total: totalAmount, values: formattedData.reverse() };
};
