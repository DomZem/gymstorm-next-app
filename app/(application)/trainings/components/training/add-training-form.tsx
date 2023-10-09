"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { TrainingType } from "./formSchema";
import TrainingFormTemplte from "./training-form-template";

const defaultValues: TrainingType = {
  title: "",
  description: "",
  date: new Date(),
  hours: {
    hourStart: "",
    hourEnd: "",
  },
  exercises: [
    {
      exerciseDetailId: "",
      series: [
        {
          reps: 0,
          weight: 0,
          breakTime: "",
        },
      ],
    },
  ],
};

export default function AddTrainingForm() {
  const queryClient = useQueryClient();

  let toastId: string = "training";

  const { mutate, isLoading } = useMutation(
    async (training: TrainingType) =>
      await axios.post("/api/training/addTraining", training),
    {
      onError: (error) => {
        toast.error("Something went wrong. Training hasn't been added", {
          id: toastId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["trainings"]);
        toast.success("Training has been added 🔥", { id: toastId });
      },
    },
  );

  const handleAddTraining = (data: TrainingType) => {
    toast.loading(`Adding ${data.title} training`, { id: toastId });
    mutate(data);
  };

  return (
    <TrainingFormTemplte
      variant="add"
      defaultValues={defaultValues}
      onSubmit={handleAddTraining}
      isSubmitButtonDisabled={isLoading}
    />
  );
}
