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

const exerciseDetailFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contains at least one character" }),
  avatarUrl: z.string().optional(),
  avatarFallback: z.string().min(1, {
    message: "Avatar fallback must contains at least one character",
  }),
});

export type ExerciseDetailType = z.infer<typeof exerciseDetailFormSchema>;

interface ExerciseFormTemplateProps {
  variant: "add" | "edit";
  isSubmitButtonDisabled: boolean;
  defaultValues: ExerciseDetailType;
  onSubmit: (data: ExerciseDetailType) => void;
}

export default function ExerciseFormTemplate({
  variant,
  isSubmitButtonDisabled,
  defaultValues,
  onSubmit,
}: ExerciseFormTemplateProps) {
  const form = useForm<ExerciseDetailType>({
    resolver: zodResolver(exerciseDetailFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = form;

  const handleFormSubmit = (data: ExerciseDetailType) => {
    onSubmit(data);

    if (variant === "add") {
      reset();
    }
  };

  return (
    <DialogContent className="max-h-[90%] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{variant === "add" ? "Add" : "Edit"} exercise</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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

          <Button className="w-full" disabled={isSubmitButtonDisabled}>
            {variant === "add" ? "Add" : "Update"} exercise
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
