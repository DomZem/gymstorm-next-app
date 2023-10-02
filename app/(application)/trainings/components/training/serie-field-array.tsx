"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
                name={`exercises[${nestIndex}].series[${k}].breakTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Break time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="destructive"
                className="px-3"
                onClick={() => remove(k)}
              >
                <MdDelete className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}

      <div className="flex gap-2">
        <Button
          className="flex-1"
          type="button"
          onClick={() =>
            append({
              reps: "",
              weight: "",
              breakTime: "",
            })
          }
        >
          Add set
        </Button>
      </div>
    </div>
  );
}