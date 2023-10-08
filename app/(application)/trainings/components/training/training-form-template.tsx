"use client";

import EmptyExercises from "@/app/(application)/components/empty-exercises";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExerciseDetail } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import ExerciseFieldArray from "./exercise-field-array";
import { TrainingType, trainingFormSchema } from "./formSchema";

interface TrainingFormTemplteProps {
  variant: "add" | "edit";
  defaultValues: TrainingType;
  onSubmit: (data: TrainingType) => void;
  isSubmitButtonDisabled: boolean;
}

const fetchExercises = async () => {
  const response = await axios.get("/api/exercise/getExercises");
  return response.data;
};

export default function TrainingFormTemplte({
  variant,
  defaultValues,
  onSubmit,
  isSubmitButtonDisabled,
}: TrainingFormTemplteProps) {
  const { data } = useQuery<ExerciseDetail[]>({
    queryFn: fetchExercises,
    queryKey: ["exercises"],
  });

  const form = useForm<TrainingType>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, register, setValue, getValues, reset } = form;

  const handleFormSubmit = (data: TrainingType) => {
    onSubmit(data);

    if (variant === "add") {
      reset();
    }
  };

  if (!data?.length) {
    return <EmptyExercises />;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Push" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="It was very good trainig."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <FormField
            control={control}
            name="hourStart"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="hourEnd"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>End</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ExerciseFieldArray
          {...{
            control,
            register,
            defaultValues,
            getValues,
            setValue,
            exercisesDetail: data,
          }}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          {variant === "add" ? "Add" : "Update"} training
        </Button>
      </form>
    </Form>
  );
}
