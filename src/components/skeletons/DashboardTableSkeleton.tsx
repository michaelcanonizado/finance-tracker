import React from "react";

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

import { Skeleton } from "@/components/ui/skeleton";

const DashboardTableSkeleton = ({
  className,
  containerClasses,
}: {
  className?: string;
  containerClasses?: string;
}) => {
  // Set headers object to easily set classNames width to each header/column
  const headers = {
    timestamp: "TIMESTAMP",
    date: "DATE",
    category: "CATEGORY",
    description: "DESCRIPTION",
    wallet: "WALLET",
    amount: "AMOUNT",
  };

  // Amount of rows rendered in body
  const bodyRowsCount = 30;
  const bodyRowsArr = Array.from(Array(bodyRowsCount).keys());

  return (
    <Table
      containerClass={twMerge(
        "relative grow max-h-[75vh] grow overflow-auto max-w-[90vw] border rounded flex flex-col",
        containerClasses,
      )}
      className={twMerge("grow", className)}
    >
      <TableHeader className="sticky top-0 z-20 bg-background">
        <TableRow className="">
          {/* Set widths to each header to match the loaded table column widths */}
          <TableHead className="w-[130px] min-w-[100px]">
            {headers.timestamp}
          </TableHead>
          <TableHead className="w-[130px] min-w-[120px]">
            {headers.date}
          </TableHead>
          <TableHead className="w-[120px] min-w-[120px]">
            {headers.category}
          </TableHead>
          <TableHead className="min-w-[200px]">{headers.description}</TableHead>
          <TableHead className="w-[110px] min-w-[100px]">
            {headers.wallet}
          </TableHead>
          <TableHead className="w-[130px] min-w-[100px] text-right">
            {headers.amount}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="">
        {bodyRowsArr.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className="sticky bottom-0 bg-muted">
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right" colSpan={2}>
            0 PHP
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardTableSkeleton;
