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
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getSessionTime, getTotalKg } from "@/lib/utils";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";

interface TrainingsListItemProps {
  training: TrainingPrismaType;
  index: number;
}

export default function TrainingsListItem({
  index,
  training: { id, title, date, hourStart, hourEnd, exercises },
}: TrainingsListItemProps) {
  const queryClient = useQueryClient();

  // Delete training
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/training/deleteTraining", { data: id }),
    {
      onError: (error) => {
        toast.error("Something went wrong. Training hasn't been deleted", {
          id,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["trainings"]);
        toast.success("Training has been deleted", { id });
      },
    },
  );

  return (
    <AlertDialog>
      <TableRow>
        <TableCell className="font-medium">{index}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{format(new Date(date), "d LLLL Y")}</TableCell>
        <TableCell>{getSessionTime(hourStart, hourEnd)}</TableCell>
        <TableCell className="text-right">{getTotalKg(exercises)}</TableCell>
        <TableCell className="flex items-center justify-end gap-2">
          <Button>Edit</Button>

          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <MdDelete className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
        </TableCell>
      </TableRow>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="text-primary">`{title}` </span>
            training and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading(`Deleting ${title} training`, {
                id,
              });
              mutate(id);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
