import { authenticateGoogleSheets } from "./authenticateGoogleSheets";

export const sendCashFlowData = async (sheetName: string) => {
  const [googleSheets, auth, spreadsheetId] = await authenticateGoogleSheets();

  const res = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    responseValueRenderOption: "FORMATTED_VALUE",
    requestBody: {
      majorDimension: "ROWS",
      values: [["test TESTING APPEND", "TESTING APPEND", "TESTING APPEND"]],
    },
  });

  console.log(res);
};
