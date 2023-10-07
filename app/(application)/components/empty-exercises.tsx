"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function EmptyExercises() {
  const queryClient = useQueryClient();
  let exerciseId: string = "exercise";

  const { mutate } = useMutation(
    async () => await axios.post("/api/exercise/addDefaultExercises"),
    {
      onError: (error) => {
        toast.error("Something went wrong. Exercises hasn't been added", {
          id: exerciseId,
        });
      },
      onSuccess: (data) => {
        toast.success("Exercises has been added 🔥", { id: exerciseId });
        queryClient.invalidateQueries(["exercises"]);
      },
    },
  );

  const handleCreateExercises = () => {
    toast.loading(`Adding default exercises`, { id: exerciseId });
    mutate();
  };

  return (
    <section className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <h4 className="text-xl font-semibold tracking-tight">No exercises</h4>
        <p className="text-sm text-muted-foreground">
          You don't have any exercises. You have to create at least one to
          create training!
        </p>
      </div>
      <Button onClick={handleCreateExercises}>Get a default exercises</Button>
    </section>
  );
}
