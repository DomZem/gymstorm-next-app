"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { TrainingType } from "./formSchema";
import TrainingFormTemplte from "./training-form-template";

interface EditTrainingFormProps {
  trainingId: string;
  defaultValues: TrainingType;
}

export default function EditTrainingForm({
  trainingId,
  defaultValues,
}: EditTrainingFormProps) {
  const queryClient = useQueryClient();

  let toastId: string = "training";

  const { mutate, isLoading } = useMutation(
    async (training: TrainingType) =>
      await axios.put("/api/training/updateTraining", {
        trainingId,
        ...training,
      }),
    {
      onError: (error) => {
        toast.error("Something went wrong. Training hasn't been edited", {
          id: toastId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["trainings"]);
        toast.success("Training has been edited 🔥", { id: toastId });
      },
    },
  );

  const handleEditTraining = (data: TrainingType) => {
    toast.loading(`Editing ${data.title} training`, { id: toastId });
    mutate(data);
  };

  return (
    <DialogContent className="max-h-[90%] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit training</DialogTitle>
      </DialogHeader>
      <TrainingFormTemplte
        variant="edit"
        defaultValues={defaultValues}
        onSubmit={handleEditTraining}
        isSubmitButtonDisabled={isLoading}
      />
    </DialogContent>
  );
}
