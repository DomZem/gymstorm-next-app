"use client";

import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import axios from "axios";
import { useQuery } from "react-query";
import EmptyTrainings from "../components/empty-trainings";
import ErrorTrainings from "../components/error-trainings";
import LoadingTrainings from "../components/loading-trainings";
import RecordsList from "../components/records-list";
import ExerciseProgress from "./components/exercise-progress";
import ExercisesList from "./components/exercises-list";

const fetchTrainings = async () => {
  const response = await axios.get("/api/training/getTrainings");
  return response.data;
};

export default function ExercisesPage() {
  const { data, isLoading, isError } = useQuery<TrainingPrismaType[]>({
    queryFn: fetchTrainings,
    queryKey: ["trainings"],
  });

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden md:gap-6 xl:grid-cols-3 xl:grid-rows-none">
      <section className="flex flex-col gap-6 overflow-hidden xl:col-span-2">
        {isLoading && <LoadingTrainings />}
        {isError && <ErrorTrainings />}
        {!data?.length && !isLoading && <EmptyTrainings />}

        {data !== undefined && data.length > 0 && (
          <>
            <RecordsList trainings={data} />
            <ExerciseProgress trainings={data} />
          </>
        )}
      </section>
      <section className="h-full overflow-hidden xl:col-start-3">
        <ExercisesList />
      </section>
    </div>
  );
}
