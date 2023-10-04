"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 80,
  },
  {
    name: "Feb",
    total: 85,
  },
  {
    name: "Mar",
    total: 87,
  },
  {
    name: "Apr",
    total: 90,
  },
  {
    name: "May",
    total: 92,
  },
  {
    name: "Jun",
    total: 95,
  },
  {
    name: "Jul",
    total: 100,
  },
  {
    name: "Aug",
    total: 110,
  },
  {
    name: "Sep",
    total: 115,
  },
  {
    name: "Oct",
    total: 120,
  },
  {
    name: "Nov",
    total: 130,
  },
  {
    name: "Dec",
    total: 135,
  },
];

export default function ExerciseChartProgress() {
  const { theme } = useTheme();

  const color = `${theme === "dark" ? "#fff" : "#0f172a"}`;

  return (
    <Card className="hidden flex-1 flex-col xl:flex">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Excersie progress</CardTitle>
        <form style={{ margin: 0 }} className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Measure option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oneRepMax">One rep max</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="total">Total</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Exercise name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Bench press</SelectItem>
              <SelectItem value="dark">Squat</SelectItem>
              <SelectItem value="system">Romanian deadlift</SelectItem>
            </SelectContent>
          </Select>
          <Button>Get stats</Button>
        </form>
      </CardHeader>

      <CardContent className="grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value} kg`}
            />
            <Line
              type="linear"
              dataKey="total"
              dot={{
                stroke: color,
                fill: color,
              }}
              strokeWidth={2}
              className="stroke-slate-950"
              stroke={color}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
