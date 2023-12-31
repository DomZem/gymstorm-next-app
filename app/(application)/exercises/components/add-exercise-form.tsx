"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import ExerciseFormTemplate, {
  ExerciseDetailType,
} from "./exercise-form-template";

const defaultValues: ExerciseDetailType = {
  name: "",
  avatarFallback: "",
  avatarUrl: "",
};

export default function AddExerciseForm() {
  const queryClient = useQueryClient();
  let exerciseId: string = "exercise";

  // Create exercise
  const { mutate, isLoading } = useMutation(
    async (exerciseDetail: ExerciseDetailType) =>
      await axios.post("/api/exercise/addExercise", exerciseDetail),
    {
      onError: (error) => {
        toast.error("Something went wrong. Exercise hasn't been added", {
          id: exerciseId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["exercises"]);
        toast.success("Exercise has been added 🔥", { id: exerciseId });
      },
    },
  );

  const handleCreateExercise = (data: ExerciseDetailType) => {
    toast.loading(`Adding ${data.name} exercise`, { id: exerciseId });
    mutate(data);
  };

  return (
    <ExerciseFormTemplate
      variant="add"
      defaultValues={defaultValues}
      isSubmitButtonDisabled={isLoading}
      onSubmit={handleCreateExercise}
    />
  );
}
