"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { TrainingPrismaType } from "@/pages/api/training/getTrainings";
import emptyImage from "@/public/empty.svg";
import errorImage from "@/public/error.svg";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
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

  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="flex h-full items-center justify-center">
        <CardHeader className="flex flex-row items-center gap-6">
          <CardTitle>Download trainings</CardTitle>
          <Spinner />
        </CardHeader>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="flex h-full flex-1 items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-3">
          <CardHeader>
            <CardTitle className="text-center">
              Something went wrong during download trainings. Try maybe later!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Image
              width={0}
              height={0}
              style={{ width: "60%", height: "auto" }}
              src={errorImage}
              alt="sad face"
            />
          </CardContent>
        </div>
      </Card>
    );
  }

  if (!data?.length) {
    return (
      <Card className="flex h-full flex-1 items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-3">
          <CardHeader>
            <CardTitle className="text-center">
              You have no training. Create a first one!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Image
              width={0}
              height={0}
              style={{ width: "60%", height: "auto" }}
              src={emptyImage}
              alt="sad face"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/trainings")}>
              Create training
            </Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden md:gap-6 xl:grid-cols-4 xl:grid-rows-[1fr]">
      <section className="flex flex-col overflow-hidden md:gap-6 xl:col-start-1 xl:col-end-4">
        <RecordsList />
        <div className="hidden flex-1 xl:flex">
          <TrainingsList trainings={data} />
        </div>
      </section>
      <section className="h-full overflow-hidden xl:col-start-4">
        <Statistics trainings={data} />
      </section>
    </div>
  );
}
