import { NextRequest } from "next/server";

import { authenticateGoogleSheets } from "@/lib/authenticateGoogleSheets";

import { ICashFlowDetails, ICashFlow } from "@/types/main";

// Set values to 'any[]' as googleSheets.spreadsheets.values.append is looking for an array of any
export const sendCashFlowData = async (sheetName: string, values: any[][]) => {
  const [googleSheets, auth, spreadsheetId] = await authenticateGoogleSheets();
  console.log(values);
  const res = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    responseValueRenderOption: "FORMATTED_VALUE",
    requestBody: {
      majorDimension: "ROWS",
      values: values,
    },
  });

  return res;
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const arrayOfValues = body.values.map((row: ICashFlowDetails) => {
    return [
      row.timestamp,
      row.date,
      row.amount,
      row.category,
      row.description,
      row.account,
    ];
  });

  const res = await sendCashFlowData(body.sheet, arrayOfValues);

  return new Response("OK");
}
