import React from "react";

import { IExpense } from "@/interfaces/IExpenses";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardTable = async ({ data }: { data: IExpense[] }) => {
  console.log(data);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead> */}
          {Object.keys(data[0]).map((header, index, arr) => {
            return (
              <TableHead
                key={index}
                className={index === arr.length - 1 ? "text-right" : ""}
              >
                {header.toUpperCase()}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="text-xm text-muted-foreground">
              {row.timestamp}
            </TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell className="scrolling-touch hide-scrollbar max-w-[200px] overflow-y-scroll whitespace-nowrap">
              {row.description}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {row.amount.toFixed(2)} PHP
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardTable;
