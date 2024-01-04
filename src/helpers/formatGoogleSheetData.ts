import { GoogleSheets } from "@/types/main";

import { formatDate } from "@/helpers/formatDate";

export const formatGoogleSheetData = (
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
