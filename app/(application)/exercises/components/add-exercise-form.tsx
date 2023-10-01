"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const exerciseDetailFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contains at least one character" }),
  avatarUrl: z
    .string()
    .includes("https", {
      message: "Avatar URL must contains https",
    })
    .optional(),
  avatarFallback: z.string().min(1, {
    message: "Avatar fallback must contains at least one character",
  }),
});

export default function AddExerciseForm() {
  const form = useForm<z.infer<typeof exerciseDetailFormSchema>>({
    resolver: zodResolver(exerciseDetailFormSchema),
    defaultValues: {
      name: "",
      avatarUrl: "",
      avatarFallback: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = (values: z.infer<typeof exerciseDetailFormSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent className="max-h-[90%] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add exercise</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bench press" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="avatarFallback"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Avatar fallback</FormLabel>
                  <FormControl>
                    <Input placeholder="BP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URl</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://images.pexels.com/photos/"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Add exercise</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
