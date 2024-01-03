import React from "react";

import { GoogleSheets, ICashFlow } from "@/types/main";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { twMerge } from "tailwind-merge";

const DashboardTable = async ({
  className,
  containerClasses,
  data,
}: {
  className?: string;
  containerClasses?: string;
  data: ICashFlow;
}) => {
  return (
    // containerClass are classes applied to the parent/wrapper container of the table: <div><table></table> </div>
    <Table
      containerClass={twMerge(
        "relative grow max-h-[75vh] overflow-auto max-w-[90vw]",
        containerClasses,
      )}
      className={twMerge("", className)}
    >
      <TableHeader className="sticky top-0  bg-background">
        <TableRow className="">
          {Object.keys(data.values[0]).map((header, index, arr) => {
            return (
              <TableHead
                key={index}
                className={`${index === arr.length - 1 ? "text-right" : ""}`}
              >
                {header.toUpperCase()}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {data.values.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="text-xm text-muted-foreground">
              {row.timestamp}
            </TableCell>
            <TableCell className="">{row.date}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell className="">{row.description}</TableCell>

            {/* Render the acoount column if in income page */}
            {data.sheet === GoogleSheets.income ? (
              <TableCell className="">{row.account}</TableCell>
            ) : (
              ""
            )}

            <TableCell className="text-right font-semibold">
              {row.amount.toFixed(2)} PHP
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="sticky bottom-0 bg-muted">
        <TableRow>
          <TableCell colSpan={data.sheet === GoogleSheets.income ? 4 : 3}>
            Total
          </TableCell>
          <TableCell className="text-right" colSpan={2}>
            {data.total.toFixed(2)} PHP
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardTable;
