"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import ExerciseFormTemplate, {
  ExerciseDetailType,
} from "./exercise-form-template";

interface EditExerciseFormProps {
  defaultValues: {
    id: string;
    name: string;
    avatarUrl?: string;
    avatarFallback: string;
  };
}

export default function EditExerciseForm({
  defaultValues,
}: EditExerciseFormProps) {
  const queryClient = useQueryClient();
  let exerciseId: string = "exercise";

  // Edit exercise
  const { mutate, isLoading } = useMutation(
    async (exerciseDetail: ExerciseDetailType) =>
      await axios.put("/api/exercise/updateExercise", {
        id: defaultValues.id,
        ...exerciseDetail,
      }),
    {
      onError: (error) => {
        toast.error("Something went wrong. Exercise hasn't been edited", {
          id: exerciseId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["exercises"]);
        toast.success("Exercise has been edited 🔥", { id: exerciseId });
      },
    },
  );

  const handleUpdateExercise = (data: ExerciseDetailType) => {
    toast.loading(`Editing ${defaultValues.name} exercise`, { id: exerciseId });
    mutate(data);
  };

  return (
    <ExerciseFormTemplate
      variant="edit"
      defaultValues={defaultValues}
      isSubmitButtonDisabled={isLoading}
      onSubmit={handleUpdateExercise}
    />
  );
}
