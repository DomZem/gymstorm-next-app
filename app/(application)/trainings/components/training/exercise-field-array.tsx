"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExerciseDetail } from "@prisma/client";
import axios from "axios";
import { useFieldArray } from "react-hook-form";
import { useQuery } from "react-query";
import SerieFieldArray from "./serie-field-array";

const fetchExercises = async () => {
  const response = await axios.get("/api/exercise/getExercises");
  return response.data;
};

export default function ExerciseFieldArray({ control, register }) {
  const { data } = useQuery<ExerciseDetail[]>({
    queryFn: fetchExercises,
    queryKey: ["exercises"],
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  return (
    <div className="flex flex-col">
      <ul className="mb-6 flex flex-col gap-6">
        {fields.map((item, index) => {
          return (
            <li
              key={item.id}
              className="flex flex-col gap-2 rounded-md bg-primary-foreground p-2"
            >
              <FormField
                control={control}
                name={`exercises[${index}].exerciseDetailId`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exercise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map(({ id, name }) => (
                          <SelectItem value={id} key={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <SerieFieldArray nestIndex={index} {...{ control, register }} />

              <Button
                className="whitespace-nowrap"
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Delete exercise
              </Button>
            </li>
          );
        })}
      </ul>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          append({
            exerciseDetailId: "",
            series: [
              {
                reps: 0,
                weight: 0,
                breakTime: "",
              },
            ],
          });
        }}
      >
        Add exercise
      </Button>
    </div>
  );
}
