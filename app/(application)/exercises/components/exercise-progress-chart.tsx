import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from "./exercise-progress";

interface ExerciseProgressChartProps {
  data?: ChartData[];
}

export default function ExerciseProgressChart({
  data,
}: ExerciseProgressChartProps) {
  const { theme } = useTheme();
  const color = `${theme === "dark" ? "#fff" : "#0f172a"}`;

  if (data === null) {
    return (
      <CardContent className="flex h-full flex-col items-center justify-center gap-3 p-4">
        <h4 className="text-xl font-semibold tracking-tight">Select options</h4>
        <p className="text-sm text-muted-foreground">
          To display chart select the measure option and then exercise, after
          that hit the button to ger your chart!
        </p>
      </CardContent>
    );
  }

  if (!data?.length) {
    return (
      <CardContent className="flex h-full flex-col items-center justify-center gap-3 p-4">
        <h4 className="text-xl font-semibold tracking-tight">No data</h4>
        <p className="text-sm text-muted-foreground">
          It seems there is not data yet to display by chosen options. Add more
          trainings to display data.
        </p>
      </CardContent>
    );
  }

  return (
    <CardContent className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
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
            dataKey="value"
            dot={{
              stroke: color,
              fill: color,
            }}
            strokeWidth={2}
            className="stroke-slate-950"
            stroke={color}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-2 text-sm text-muted-foreground">
          <p>
            Date:{" "}
            <span className="font-semibold text-primary">{`${label}`}</span>
          </p>
          <p>
            Weight:{" "}
            <span className="font-semibold text-primary">{`${payload[0].value}kg`}</span>{" "}
          </p>
        </CardContent>
      </Card>
    );
  }
  return null;
};
