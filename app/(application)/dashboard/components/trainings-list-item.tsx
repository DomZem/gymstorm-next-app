import { TableCell, TableRow } from "@/components/ui/table";
import { getSessionTime, getTotalKg } from "@/lib/utils";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import { format } from "date-fns";

interface TrainingsListItemProps {
  training: TrainingPrismaType;
  index: number;
}

export default function TrainingsListItem({
  index,
  training: { title, date, hourStart, hourEnd, exercises },
}: TrainingsListItemProps) {
  return (
    <TableRow className="whitespace-nowrap">
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{format(new Date(date), "d LLLL Y")}</TableCell>
      <TableCell>{getSessionTime(hourStart, hourEnd)}</TableCell>
      <TableCell>{exercises.length}</TableCell>
      <TableCell className="text-right">{getTotalKg(exercises)} kg</TableCell>
    </TableRow>
  );
}
