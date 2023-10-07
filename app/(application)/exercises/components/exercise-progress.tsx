"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import { ExerciseDetail } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { useQuery } from "react-query";
import ExerciseProgressChart from "./exercise-progress-chart";

export interface ChartData {
  date: string;
  value: number;
}

type MeasureOptionType = "oneRepMax" | "average" | "total";

const getRecords = (
  trainings: TrainingPrismaType[],
  exerciseDetailName: string,
): ChartData[] => {
  const result: ChartData[] = [];

  trainings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  trainings.forEach(({ exercises, date }) => {
    exercises.forEach(({ series, exerciseDetail: { name } }) => {
      if (exerciseDetailName === name) {
        series.forEach(({ reps, weight }) => {
          if (reps === 1) {
            result.push({
              date: format(new Date(date), "d LLL Y"),
              value: weight,
            });
          }
        });
      }
    });
  });

  return result;
};

const getTotal = (
  trainings: TrainingPrismaType[],
  exerciseDetailName: string,
) => {
  const result: ChartData[] = [];

  trainings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  trainings.forEach(({ exercises, date }) => {
    exercises.forEach(({ series, exerciseDetail: { name } }) => {
      if (exerciseDetailName === name) {
        let total = 0;
        series.forEach(({ reps, weight }) => {
          total += reps * weight;
        });
        result.push({
          date: format(new Date(date), "d LLL Y"),
          value: total,
        });
      }
    });
  });

  return result;
};

const getAverage = (
  trainings: TrainingPrismaType[],
  exerciseDetailName: string,
) => {
  const result: ChartData[] = [];

  trainings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  trainings.forEach(({ exercises, date }) => {
    exercises.forEach(({ series, exerciseDetail: { name } }) => {
      if (exerciseDetailName === name) {
        let total = 0;

        series.forEach(({ reps, weight }) => {
          total += reps * weight;
        });

        result.push({
          date: format(new Date(date), "d LLL Y"),
          value: total / series.length,
        });
      }
    });
  });

  return result;
};

const fetchExercises = async () => {
  const response = await axios.get("/api/exercise/getExercises");
  return response.data;
};

interface ExerciseProgressProps {
  trainings: TrainingPrismaType[];
}

export default function ExerciseProgress({ trainings }: ExerciseProgressProps) {
  const [measureOption, setMeasureOption] = useState<MeasureOptionType | "">(
    "",
  );
  const [exerciseDetailName, setExerciseDetailName] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>();

  const { data } = useQuery<ExerciseDetail[]>({
    queryFn: fetchExercises,
    queryKey: ["exercises"],
  });

  if (!data?.length) {
    return (
      <Card>
        <p>Impossible to get stats!</p>
      </Card>
    );
  }

  const handleGetStats = () => {
    switch (measureOption) {
      case "oneRepMax":
        setChartData(getRecords(trainings, exerciseDetailName));
        break;
      case "average":
        setChartData(getAverage(trainings, exerciseDetailName));
        break;
      case "total":
        setChartData(getTotal(trainings, exerciseDetailName));
        break;
    }
  };

  return (
    <Card className="hidden flex-1 flex-col xl:flex">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Excersie progress</CardTitle>
        <div style={{ margin: 0 }} className="flex items-center gap-3">
          <Select
            value={measureOption}
            onValueChange={(value: MeasureOptionType) =>
              setMeasureOption(value)
            }
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Measure option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oneRepMax">One rep max</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="total">Total</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={exerciseDetailName}
            onValueChange={(value) => setExerciseDetailName(value)}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Exercise name" />
            </SelectTrigger>
            <SelectContent>
              {data.map(({ id, name }) => (
                <SelectItem value={name} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGetStats}>Get stats</Button>
        </div>
      </CardHeader>

      <ExerciseProgressChart data={chartData} />
    </Card>
  );
}
