"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import TrainingsListItem from "./trainings-list-item";

interface TrainingsListProps {
  trainings: TrainingPrismaType[];
}

export default function TrainingsList({ trainings }: TrainingsListProps) {
  return (
    <Card className="flex-1 overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Session time (minutes)</TableHead>
            <TableHead>Exercises</TableHead>
            <TableHead className="text-right">Total kg</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {trainings.map((value, index) => (
            <TrainingsListItem
              training={value}
              index={index + 1}
              key={value.id}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
