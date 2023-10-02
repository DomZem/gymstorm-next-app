import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import EditExerciseForm from "./edit-exercise-form";

interface ExercisesListItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
}

export default function ExercisesListItem({
  id,
  name,
  avatarUrl,
  avatarFallback,
}: ExercisesListItemProps) {
  const queryClient = useQueryClient();

  const defaultValues = {
    id,
    name,
    avatarUrl,
    avatarFallback,
  };

  // Delete exercise
  const deleteExerciseMutation = useMutation(
    async (id: string) =>
      await axios.delete("/api/exercise/deleteExercise", { data: id }),
    {
      onError: (error) => {
        toast.error("Something went wrong. Exercise hasn't been deleted", {
          id,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["exercises"]);
        toast.success("Exercise has been deleted", { id });
      },
    },
  );

  return (
    <Dialog>
      <AlertDialog>
        <li className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
          </div>
          <div className="ml-auto flex gap-4">
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>

            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <MdDelete className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
          </div>
        </li>
        <EditExerciseForm defaultValues={defaultValues} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              <span className="text-primary">`{name}` </span>
              exercise and its associated trainings from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.loading(`Deleting ${name} exercise`, {
                  id,
                });
                deleteExerciseMutation.mutate(id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
