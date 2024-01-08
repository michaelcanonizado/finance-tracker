import { formatText } from "@/helpers/formatText";
import { formatDate } from "@/helpers/formatDate";

export const formatGoogleSheetData = (rawData: any[][]) => {
  rawData.shift();

  const formattedData = [];

  // Total income/expenses accumulator of the values fetched
  let totalAmount = 0;
  // Format array of arrays data into array of objects
  formattedData.push(
    ...rawData.map((row, index) => {
      totalAmount += parseFloat(row[2]);
      return {
        timestamp: formatText(row[0]),
        date: formatDate(row[1], "short"),
        category: formatText(row[3]),
        description: formatText(row[4]),
        wallet: formatText(row[5]),
        amount: parseFloat(row[2]),
      };
    }),
  );

  return { total: totalAmount, values: formattedData.reverse() };
};
