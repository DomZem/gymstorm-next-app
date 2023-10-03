import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";

interface TrainingsListItemProps {
  id: string;
  title: string;
  date: string;
  sessionTime: string;
  totalKg: number;
  index: number;
}

export default function TrainingsListItem({
  index,
  title,
  date,
  totalKg,
}: TrainingsListItemProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{format(new Date(date), "d LLLL Y")}</TableCell>
      <TableCell>1h 30 minutes</TableCell>
      <TableCell className="text-right">{totalKg}</TableCell>
      <TableCell className="flex items-center justify-end gap-2">
        <Button>Edit</Button>

        <Button variant="destructive" size="icon">
          <MdDelete className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
