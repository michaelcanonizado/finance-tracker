import { GoogleSheets, ICashFlow } from "@/types/main";

import { authenticateGoogleSheets } from "./authenticateGoogleSheets";
import { formatGoogleSheetData } from "@/helpers/formatGoogleSheetData";

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
