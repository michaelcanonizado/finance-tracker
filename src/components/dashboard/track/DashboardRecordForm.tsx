"use client";

import React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  GoogleSheets,
  IncomeCategories,
  ExpensesCategories,
  Wallets,
  ICashFlow,
} from "@/types/main";

const DashboardRecordForm = ({
  variant,
}: {
  variant: keyof typeof GoogleSheets;
}) => {
  // Change input description based on variants
  const inputDescription =
    variant === "income"
      ? {
          // Record income form descriptions
          amount: "Amount to deposit",
          account: "Wallet to deposit",
          date: "Date of income",
          category: "Category of income",
          description: "Extra details on income",
        }
      : {
          // Record expense form descriptions
          amount: "Amount to deduct",
          account: "Wallet to deduct",
          date: "Date of expense",
          category: "Category of expense",
          description: "Extra details on expense",
        };

  // Define zod Schema
  const formSchema = z.object({
    amount: z.string().refine(
      (input) => {
        if (Number.isNaN(Number(input)) || parseFloat(input) < 0) {
          return false;
        }
        return input;
      },
      { message: "Please enter a valid amount" },
    ),
    account: z.enum(Wallets),
    date: z.date({
      required_error: "Please enter a valid date.",
    }),
    // Conditionally set the different categories.
    category:
      variant === "income"
        ? z.enum(IncomeCategories)
        : z.enum(ExpensesCategories),
    // Set description to be optional when variant is income (I personally wanted it to be optional).
    description:
      variant === "income"
        ? z.string().optional()
        : z.string().refine(
            (input) => {
              if (input.length <= 0) {
                return false;
              }
              return input;
            },
            { message: "Required" },
          ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  // Handle form submit.
  async function onSubmitFormHandler(values: z.infer<typeof formSchema>) {
    // Create a new Date object
    const currentDate = new Date();

    // Extract components of the date to follow the format in google sheets
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const transactionYear = values.date.getFullYear().toString().slice(-2);
    const transactionMonth = (values.date.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const transactionDay = values.date.getDate().toString().padStart(2, "0");
    const formattedTransactionDate = `${transactionMonth}/${transactionDay}/${transactionYear}`;

    // Format values to required format, ready to be pushed to google sheets
    const body: ICashFlow = {
      sheet: GoogleSheets[variant],
      values: [
        {
          timestamp: `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`,
          date: formattedTransactionDate,
          amount: parseFloat(values.amount),
          category: values.category,
          description: values.description as string,
          wallet: values.account,
        },
      ],
      total: 1,
    };

    // Send data to API
    const userID = "123456789";
    await fetch(`http://localhost:3000/api/${userID}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitFormHandler)}
        className="flex w-full max-w-[500px] flex-col gap-y-8"
      >
        <div className="grid grid-cols-2 gap-2">
          {/* AMOUNT */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AMOUNT</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded" />
                </FormControl>
                <FormDescription className="text-xs">
                  {inputDescription.amount}
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* ACCOUNT */}
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WALLET</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded">
                    {Wallets.map((wallet, index) => {
                      return (
                        <SelectItem
                          value={wallet}
                          key={index}
                          className="hover:cursor-pointer"
                        >
                          {wallet}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  {inputDescription.account}
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* DATE */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DATE</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="overflow-hidden rounded">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start pl-2 text-left font-normal xs:pl-3 sm:pl-4",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 hidden h-4 w-4 xs:block" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto rounded p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">
                  {inputDescription.date}
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* CATEGORY */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CATERGORY</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded">
                    {variant === "income"
                      ? IncomeCategories.map((category, index) => {
                          return (
                            <SelectItem
                              value={category}
                              key={index}
                              className="hover:cursor-pointer"
                            >
                              {category}
                            </SelectItem>
                          );
                        })
                      : ExpensesCategories.map((category, index) => {
                          return (
                            <SelectItem
                              value={category}
                              key={index}
                              className="hover:cursor-pointer"
                            >
                              {category}
                            </SelectItem>
                          );
                        })}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  {inputDescription.category}
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DESCRIPTION</FormLabel>
              <FormControl>
                <Input {...field} className="rounded" />
              </FormControl>
              <FormDescription className="text-xs">
                {inputDescription.description}
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button className="rounded" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default DashboardRecordForm;
