"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { MdDelete } from "react-icons/md";

interface SerieFieldArrayProps {
  nestIndex: number;
  control: Control<FieldValues>;
}

export default function SerieFieldArray({
  nestIndex,
  control,
}: SerieFieldArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `exercises[${nestIndex}].series`,
  });

  const [previousReps, setPreviousReps] = useState<number | null>(null);
  const [previousWeight, setPreviousWeight] = useState<number | null>(null);
  const [previousBreakTime, setPreviousBreakTime] = useState<string>("");

  useEffect(() => {
    const { reps, weight, breakTime } = fields[fields.length - 1];

    setPreviousReps(reps);
    setPreviousWeight(weight);
    setPreviousBreakTime(breakTime);
  }, [fields, remove]);

  return (
    <div className="flex flex-col gap-2">
      {fields.map((item, k) => {
        return (
          <div key={item.id}>
            <div className="flex gap-2">
              <FormField
                control={control}
                name={`exercises[${nestIndex}].series[${k}].reps`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Reps"
                        value={parseInt(field.value, 10) || ""}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value, 10) || "");
                          if (fields.length - 1 === k) {
                            setPreviousReps(
                              parseInt(e.target.value, 10) || null,
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`exercises[${nestIndex}].series[${k}].weight`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Weight (kg)"
                        value={parseFloat(field.value) || ""}
                        onChange={(e) => {
                          field.onChange(parseFloat(e.target.value) || "");
                          if (fields.length - 1 === k) {
                            setPreviousWeight(
                              parseFloat(e.target.value) || null,
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`exercises[${nestIndex}].series[${k}].breakTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Break time"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          if (fields.length - 1 === k) {
                            setPreviousBreakTime(e.target.value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="destructive"
                className="px-3"
                onClick={() => {
                  remove(k);
                }}
                disabled={fields.length === 1}
              >
                <MdDelete className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}

      <div className="flex flex-col gap-2 md:flex-row">
        <Button
          className="flex-1"
          type="button"
          onClick={() => {
            append({
              reps: 0,
              weight: 0,
              breakTime: "",
            });
            setPreviousReps(null);
            setPreviousWeight(null);
            setPreviousBreakTime("");
          }}
        >
          Add set
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          onClick={() => {
            append({
              reps: previousReps,
              weight: previousWeight,
              breakTime: previousBreakTime,
            });
          }}
          disabled={
            previousReps === null ||
            previousWeight === null ||
            previousBreakTime === ""
          }
        >
          Add previous set
        </Button>
      </div>
    </div>
  );
}
