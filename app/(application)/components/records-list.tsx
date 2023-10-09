import { Card, CardContent } from "@/components/ui/card";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import RecordsListItem from "./records-list-item";

interface OneRepMax {
  exerciseName: string;
  date: Date;
  weight: number;
}

interface ExerciseRecord {
  id: string;
  exerciseName: string;
  recordDate: Date;
  currentHighScore: number;
  previousHighScore: number;
}

const getRecords = (trainings: TrainingPrismaType[]) => {
  const oneRepMaxArr: OneRepMax[] = [];

  trainings.forEach(({ exercises, date }) => {
    exercises.forEach(({ series, exerciseDetail: { name } }) => {
      series.forEach(({ reps, weight }) => {
        if (reps === 1) {
          oneRepMaxArr.push({
            exerciseName: name,
            date: new Date(date),
            weight,
          });
        }
      });
    });
  });

  const exerciseRecordsMap = new Map<string, ExerciseRecord>();

  oneRepMaxArr.sort((a, b) => a.date.getTime() - b.date.getTime());

  oneRepMaxArr.forEach((exercise) => {
    const existingRecord = exerciseRecordsMap.get(exercise.exerciseName);
    if (existingRecord) {
      if (existingRecord.recordDate < exercise.date) {
        existingRecord.previousHighScore = existingRecord.currentHighScore;
        existingRecord.currentHighScore = exercise.weight;
      }
    } else {
      exerciseRecordsMap.set(exercise.exerciseName, {
        id: String(exerciseRecordsMap.size + 1),
        exerciseName: exercise.exerciseName,
        recordDate: exercise.date,
        currentHighScore: exercise.weight,
        previousHighScore: 0,
      });
    }
  });

  const exerciseRecords: ExerciseRecord[] = Array.from(
    exerciseRecordsMap.values(),
  );

  return exerciseRecords;
};

interface RecordsListProps {
  trainings: TrainingPrismaType[];
}

export default function RecordsList({ trainings }: RecordsListProps) {
  const records = getRecords(trainings);

  if (records.length === 0) {
    return (
      <Card className="flex h-[138px] items-center justify-center">
        <CardContent className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
          <h4 className="text-xl font-semibold tracking-tight">No records</h4>
          <p className="text-sm text-muted-foreground">
            Create a training with one rep to view your current records.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ul className="flex w-full flex-row gap-3 overflow-x-auto md:gap-6">
      {records.map(
        ({
          id,
          exerciseName,
          recordDate,
          currentHighScore,
          previousHighScore,
        }) => (
          <RecordsListItem
            exerciseName={exerciseName}
            recordDate={recordDate}
            currentHighScore={currentHighScore}
            previousHighScore={previousHighScore}
            key={id}
          />
        ),
      )}
    </ul>
  );
}
