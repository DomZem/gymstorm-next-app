import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddExerciseForm from "./add-exercise-form";
import ExercisesListItem from "./exercises-list-item";

const exercises = [
  {
    id: "1",
    name: "Bench press",
    avatarFallback: "BP",
  },
  {
    id: "2",
    name: "Deadlift",
    avatarFallback: "DL",
  },
  {
    id: "3",
    name: "Squat",
    avatarFallback: "SQ",
  },
  {
    id: "4",
    name: "Sumo deadlift",
    avatarFallback: "SD",
  },
];

export default function ExercisesList() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-2 border-b">
        <CardTitle>Exercises list</CardTitle>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add exercise</Button>
          </DialogTrigger>
          <AddExerciseForm />
        </Dialog>
      </CardHeader>

      <CardContent className="h-full overflow-hidden p-0">
        <ul className="flex h-full flex-col gap-3 overflow-y-auto p-6">
          {exercises.map(({ id, name, avatarFallback }) => (
            <ExercisesListItem
              name={name}
              avatarFallback={avatarFallback}
              key={id}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
