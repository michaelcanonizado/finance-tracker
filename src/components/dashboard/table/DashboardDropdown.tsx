"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";

import { Columns4, SlidersHorizontal } from "lucide-react";

const DashboardDropdown = ({ headers }: { headers: [] }) => {
  const operators = ["=", "<", ">"];

  function onSubmit() {}

  return (
    <div className="mb-2 flex gap-4 text-sm">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded p-2">
          <Columns4 className="w-5" /> COLUMNS
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2 rounded-xl p-2">
          {headers.map((header, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <Switch
                id={header}
                className=" h-[20px] w-[35px]"
                thumbClass="h-[15px] w-[15px] data-[state=checked]:translate-x-[100%]"
              />
              <Label htmlFor={header}>{header.toUpperCase()}</Label>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded p-2">
          <SlidersHorizontal className="w-5" /> FILTERS
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl p-2">
          <form className="flex flex-row gap-2 ">
            <div className="min-w-[120px]">
              <Select>
                <span className="text-sm">Column</span>
                <SelectTrigger className="mt-1  h-[25px] w-full rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded">
                  {headers.map((header, index) => {
                    return (
                      <SelectItem
                        value={header}
                        key={index}
                        className="hover:cursor-pointer"
                      >
                        {header}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[60px]">
              <Select>
                <span className="text-sm">Operator</span>
                <SelectTrigger className="mt-1  h-[25px] w-full rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-fit rounded">
                  {operators.map((operator, index) => {
                    return (
                      <SelectItem
                        value={operator}
                        key={index}
                        className="m-0 rounded hover:cursor-pointer"
                      >
                        {operator}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[120px]">
              <span className="text-sm">Value</span>
              <Input className="mt-1 h-[25px] w-[120px] rounded" />
            </div>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardDropdown;
