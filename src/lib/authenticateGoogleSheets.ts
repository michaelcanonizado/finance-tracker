import { google } from "googleapis";

export const authenticateGoogleSheets = async () => {
  const spreadsheetId = process.env.SHEET_ID;
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  // 1) Authenticate
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // 2) Get client object
  const client = await google.auth.getClient();

  // 3) Get instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Throw error if an error occurred when authenticating
  if (!googleSheets) {
    throw new Error("Error connecting with google API");
  }

  return [googleSheets, auth, spreadsheetId] as [
    typeof googleSheets,
    typeof auth,
    typeof spreadsheetId,
  ];
};
