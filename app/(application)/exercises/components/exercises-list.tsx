"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ExerciseDetail } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";
import AddExerciseForm from "./add-exercise-form";
import ExercisesListItem from "./exercises-list-item";
import ExercisesListItemSkeleton from "./exercises-list-item-skeleton";

const fetchExercises = async () => {
  const response = await axios.get("/api/exercise/getExercises");
  return response.data;
};

export default function ExercisesList() {
  const { data, isLoading, isError } = useQuery<ExerciseDetail[]>({
    queryFn: fetchExercises,
    queryKey: ["exercises"],
  });

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
        {isLoading && (
          <ul className="flex h-full flex-col gap-3 p-6">
            <ExercisesListItemSkeleton />
            <ExercisesListItemSkeleton />
            <ExercisesListItemSkeleton />
            <ExercisesListItemSkeleton />
          </ul>
        )}

        {isError && (
          <section className="flex h-full items-center justify-center">
            <div>
              <h1>Something went wrong. Try maybe later!</h1>
            </div>
          </section>
        )}

        {data && data.length > 0 && (
          <ul className="flex h-full flex-col gap-3 overflow-y-auto p-6">
            {data.map(({ id, name, avatarFallback }) => (
              <ExercisesListItem
                name={name}
                avatarFallback={avatarFallback}
                key={id}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
