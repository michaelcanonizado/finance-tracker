import { google } from "googleapis";

const url =
  "https://docs.google.com/spreadsheets/d/126uZPcPz9o0v8oVL-2Zr3inP2l9w2yajc-NGPIesiZw/edit?usp=sharing";

export const getData = async () => {
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

  //   console.log("appending...");
  //   const appendRes = await googleSheets.spreadsheets.values.append({
  //     auth,
  //     spreadsheetId,
  //     range: "TEST",
  //     valueInputOption: "USER_ENTERED",
  //     insertDataOption: "INSERT_ROWS",
  //     // responseValueRenderOption: "FORMATTED_VALUE",
  //     body: {
  //       values: [["test", "test", "test", "test", "test"]],
  //     },
  //   });
  //   console.log("appending complete...");

  // Get rows
  const rows = await googleSheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: "TEST",
  });

  console.log(rows.data);
};
