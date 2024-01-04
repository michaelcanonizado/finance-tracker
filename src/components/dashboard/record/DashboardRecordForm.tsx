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

import { IncomeCategories, ExpensesCategories, Accounts } from "@/types/main";

const DashboardRecordForm = ({
  variant,
}: {
  variant: "income" | "expense";
}) => {
  // Change input description based on variants
  const inputDescription =
    variant === "income"
      ? {
          // Record income form descriptions
          amount: "Amount to deposit",
          account: "Account to deposit",
          date: "Date of income",
          category: "Category of income",
          description: "Extra details on income",
        }
      : {
          // Record expense form descriptions
          amount: "Amount to deduct",
          account: "Account to deduct",
          date: "Date of expense",
          category: "Category of expense",
          description: "Extra details on expense",
        };

  // Define zod Schema
  const formSchema = z.object({
    amount: z.coerce.number({
      invalid_type_error: "Please enter a valid amount.",
    }),
    account: z.enum(Accounts),
    date: z.date({
      required_error: "Please enter a valid date.",
    }),
    category: z.enum(ExpensesCategories),
    // Set description to be optional when variant is income (I personally wanted it to be optional).
    description: variant === "income" ? z.string().optional() : z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Set description field's default values to empty string when variant is income (description needs to be undefined to trigger the required error when description is set to required).
      description: variant === "income" ? "" : undefined,
    },
  });

  // Handle form submit.
  function onSubmitFormHandler(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <FormLabel>ACCOUNT</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded">
                    {Accounts.map((account, index) => {
                      return (
                        <SelectItem
                          value={account}
                          key={index}
                          className="hover:cursor-pointer"
                        >
                          {account}
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
                          "xs:pl-3 w-full justify-start pl-2 text-left font-normal sm:pl-4",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="xs:block mr-2 hidden h-4 w-4" />
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
                      <SelectValue placeholder="" />
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
