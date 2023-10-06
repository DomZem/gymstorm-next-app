"use client";

import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import axios from "axios";
import { useQuery } from "react-query";
import EmptyTrainings from "../components/empty-trainings";
import ErrorTrainings from "../components/error-trainings";
import LoadingTrainings from "../components/loading-trainings";
import RecordsList from "../components/records-list";
import ExerciseChartProgress from "./components/exercise-chart-progress";
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
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden md:gap-6 xl:grid-cols-4 xl:grid-rows-[1fr]">
      <section className="flex flex-col gap-6 overflow-hidden xl:col-start-1 xl:col-end-4">
        {isLoading && <LoadingTrainings />}
        {isError && <ErrorTrainings />}
        {!data?.length ? (
          <EmptyTrainings />
        ) : (
          <>
            <RecordsList trainings={data} />
            <ExerciseChartProgress />
          </>
        )}
      </section>
      <section className="h-full overflow-hidden xl:col-start-4">
        <ExercisesList />
      </section>
    </div>
  );
}
