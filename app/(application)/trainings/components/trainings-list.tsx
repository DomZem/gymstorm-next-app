"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import axios from "axios";
import { useQuery } from "react-query";
import TrainingsListItem from "./trainings-list-item";

const fetchTrainings = async () => {
  const response = await axios.get("/api/training/getTrainings");
  return response.data;
};

export default function TrainingsList() {
  const { data, isLoading, isError } = useQuery<TrainingPrismaType[]>({
    queryFn: fetchTrainings,
    queryKey: ["trainings"],
  });

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
        {!isLoading &&
          data?.map((value, index) => (
            <TrainingsListItem
              training={value}
              index={index + 1}
              key={value.id}
            />
          ))}
      </TableBody>
    </Table>
  );
}
