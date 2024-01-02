import React from "react";

import { IExpense } from "@/interfaces/IExpenses";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardTable = async ({
  className,
  containerClasses,
  data,
}: {
  className?: string;
  containerClasses?: string;
  data: IExpense[];
}) => {
  return (
    // containerClass are classes applied to the parent/wrapper container of the table: <div><table></table> </div>
    <Table containerClass="relative grow max-h-[75vh]" className="">
      <TableHeader className="sticky top-0 bg-background">
        <TableRow className="">
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
      <TableBody className="">
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="text-xm text-muted-foreground">
              {row.timestamp}
            </TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell className="">{row.description}</TableCell>
            <TableCell className="text-right font-semibold">
              {row.amount.toFixed(2)} PHP
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="sticky bottom-0 bg-muted">
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardTable;
