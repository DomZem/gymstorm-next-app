import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TrainingsListItem from "./trainings-list-item";

const trainings = [
  {
    id: "1",
    title: "Push",
    date: new Date().toString(),
    sessionTime: "12",
    totalKg: 1200,
  },
  {
    id: "2",
    title: "Push",
    date: new Date().toString(),
    sessionTime: "12",
    totalKg: 1200,
  },
  {
    id: "3",
    title: "Push",
    date: new Date().toString(),
    sessionTime: "12",
    totalKg: 1200,
  },
  {
    id: "4",
    title: "Push",
    date: new Date().toString(),
    sessionTime: "12",
    totalKg: 1200,
  },
  {
    id: "5",
    title: "Push",
    date: new Date().toString(),
    sessionTime: "12",
    totalKg: 1200,
  },
];

export default function TrainingsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Session time (minutes)</TableHead>
          <TableHead className="text-right">Total kg</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto">
        {trainings.map(({ id, title, date, sessionTime, totalKg }, index) => (
          <TrainingsListItem
            id={id}
            title={title}
            date={date}
            sessionTime={sessionTime}
            totalKg={totalKg}
            key={id}
            index={index + 1}
          />
        ))}
      </TableBody>
    </Table>
  );
}
