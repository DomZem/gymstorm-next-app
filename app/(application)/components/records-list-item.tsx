import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface RecordsListItemProps {
  exerciseName: string;
  recordDate: Date;
  currentHighScore: number;
  previousHighScore: number;
}

export default function RecordsListItem({
  exerciseName,
  recordDate,
  currentHighScore,
  previousHighScore,
}: RecordsListItemProps) {
  const progress =
    previousHighScore === 0
      ? 100
      : ((currentHighScore - previousHighScore) / previousHighScore) * 100;

  return (
    <li className="flex-shrink-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{exerciseName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold">
            {currentHighScore} kg{" "}
            <span className="text-sm font-medium">
              at {format(recordDate, "d LLLL Y")}
            </span>{" "}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-green-600">
              +{parseFloat(progress.toFixed(2))}%
            </span>{" "}
            from last attempt
          </p>
        </CardContent>
      </Card>
    </li>
  );
}
