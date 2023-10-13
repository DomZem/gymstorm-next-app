"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";

interface SerieFieldArrayProps {
  nestIndex: number;
}

export default function SerieFieldArray({ nestIndex }: SerieFieldArrayProps) {
  const { control } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `exercises[${nestIndex}].series`,
  });

  return (
    <ul className="flex flex-col gap-2">
      {fields.map((item, k) => {
        return (
          <li key={item.id}>
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
          </li>
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
          }}
        >
          Add set
        </Button>
      </div>
    </ul>
  );
}
