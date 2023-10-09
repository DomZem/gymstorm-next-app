import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { secondsToTimeString, timeStringToSeconds } from "@/lib/utils";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";

const getStats = (trainings: TrainingPrismaType[]) => {
  let totalExercises = 0;
  let totalSeries = 0;
  let totalReps = 0;
  let totalBreakTimeSeconds = 0;
  let transferredWeight = 0;

  let favouriteExercise = "";

  const exerciseCountMap: Record<string, number> = {};
  let maxCount = 0;

  trainings.forEach(({ exercises }) => {
    exercises.forEach(({ series, exerciseDetail: { name } }) => {
      series.forEach(({ reps, weight, breakTime }) => {
        if (exerciseCountMap[name]) {
          exerciseCountMap[name]++;
        } else {
          exerciseCountMap[name] = 1;
        }
        transferredWeight += reps * weight;
        totalReps += reps;
        totalSeries++;
        totalBreakTimeSeconds += timeStringToSeconds(breakTime);
      });
      totalExercises++;
    });
  });

  for (const exerciseName in exerciseCountMap) {
    if (exerciseCountMap[exerciseName] > maxCount) {
      maxCount = exerciseCountMap[exerciseName];
      favouriteExercise = exerciseName;
    }
  }

  return {
    totalTrainings: trainings.length,
    favouriteExercise,
    transferredWeight,
    seriesPerExercise: (totalSeries / totalExercises).toFixed(0),
    repsPerSerie: (totalReps / totalSeries).toFixed(0),
    breakTimePerSerie: secondsToTimeString(
      Math.floor(totalBreakTimeSeconds / totalSeries),
    ),
  };
};

interface StatisticsProps {
  trainings: TrainingPrismaType[];
}

export default function Statistics({ trainings }: StatisticsProps) {
  const {
    totalTrainings,
    transferredWeight,
    favouriteExercise,
    seriesPerExercise,
    repsPerSerie,
    breakTimePerSerie,
  } = getStats(trainings);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-2 border-b">
        <CardTitle>Statistics</CardTitle>
      </CardHeader>

      <CardContent className="h-full overflow-hidden p-0">
        <section className="border-b p-4">
          <h4 className="text-xl font-semibold">Overview</h4>
          <ul className="ml-6 list-disc text-sm [&>li]:mt-2">
            <li>
              Total trainings:{" "}
              <span className="font-medium">{totalTrainings}</span>
            </li>
            <li>
              Transferred weight:{" "}
              <span className="font-medium">{transferredWeight} kg</span>
            </li>
            <li>
              Favourite exercise:{" "}
              <span className="font-medium">{favouriteExercise}</span>
            </li>
          </ul>
        </section>

        <section className="p-4">
          <h4 className="text-xl font-semibold">Average</h4>
          <ul className="ml-6 list-disc text-sm [&>li]:mt-2">
            <li>
              Series per exercise:{" "}
              <span className="font-medium">{seriesPerExercise}</span>
            </li>
            <li>
              Reps per serie:{" "}
              <span className="font-medium">{repsPerSerie}</span>
            </li>
            <li>
              Break time per serie:{" "}
              <span className="font-medium">{breakTimePerSerie}</span>
            </li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
