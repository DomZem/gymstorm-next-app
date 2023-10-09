"use client";

import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import axios from "axios";
import { useQuery } from "react-query";
import EmptyTrainings from "../components/empty-trainings";
import ErrorTrainings from "../components/error-trainings";
import LoadingTrainings from "../components/loading-trainings";
import RecordsList from "../components/records-list";
import Statistics from "./components/statistics";
import TrainingsList from "./components/trainings-list";

const fetchTrainings = async () => {
  const response = await axios.get("/api/training/getTrainings");
  return response.data;
};

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery<TrainingPrismaType[]>({
    queryFn: fetchTrainings,
    queryKey: ["trainings"],
  });

  if (isLoading) {
    return <LoadingTrainings />;
  }

  if (isError) {
    return <ErrorTrainings />;
  }

  if (!data?.length) {
    return <EmptyTrainings />;
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden md:gap-6 xl:grid-cols-4 xl:grid-rows-[1fr]">
      <section className="flex flex-col overflow-hidden md:gap-6 xl:col-start-1 xl:col-end-4">
        <RecordsList trainings={data} />
        <div className="hidden flex-1 overflow-y-auto xl:flex">
          <TrainingsList trainings={data} />
        </div>
      </section>
      <section className="h-full overflow-hidden xl:col-start-4">
        <Statistics trainings={data} />
      </section>
    </div>
  );
}
