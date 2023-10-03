import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getSessionTime, getTotalKg } from "@/lib/utils";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";

interface TrainingsListItemProps {
  training: TrainingPrismaType;
  index: number;
}

export default function TrainingsListItem({
  index,
  training: { title, date, hourStart, hourEnd, exercises },
}: TrainingsListItemProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{format(new Date(date), "d LLLL Y")}</TableCell>
      <TableCell>{getSessionTime(hourStart, hourEnd)}</TableCell>
      <TableCell className="text-right">{getTotalKg(exercises)}</TableCell>
      <TableCell className="flex items-center justify-end gap-2">
        <Button>Edit</Button>

        <Button variant="destructive" size="icon">
          <MdDelete className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
