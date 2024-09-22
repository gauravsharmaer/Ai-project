/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
const MockSetUp = () => {
  // Define schema with Zod
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  // Initialize the useForm hook
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Form submission handler
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="max-w-[850px] mx-auto flex flex-col  gap-3  p-10 justify-center align-middle mt-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-[30px] my-2">
                  Create an Interview
                </FormLabel>
                <FormControl>
                  <Input placeholder="Job Title" {...field} />
                </FormControl>
                <Textarea
                  placeholder="Type your job description here."
                  className="my-2"
                />
                <div className="flex justify-between ">
                  <Select>
                    <SelectTrigger className="w-[270px]">
                      <SelectValue placeholder="Interview Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Machine Coding</SelectItem>
                      <SelectItem value="dark">DSA</SelectItem>
                      <SelectItem value="system">Behavioral</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-[270px]">
                      <SelectValue placeholder="Interview Timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">30 min</SelectItem>
                      <SelectItem value="dark">45 min</SelectItem>
                      <SelectItem value="system">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-5">
                  <div className="items-top flex space-x-2 mt-3">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions*
                      </label>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">SetUp Mock</Button>
        </form>
      </Form>
    </Card>
  );
};

export default MockSetUp;
