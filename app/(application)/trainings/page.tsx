import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddTrainingForm from "./components/training/add-training-form";
import TrainingsList from "./components/trainings-list";

export default function TrainingsPage() {
  return (
    <div className="grid h-full overflow-hidden xl:gap-6 2xl:grid-cols-3 2xl:grid-rows-[1fr]">
      <section className="flex flex-col gap-6 overflow-hidden 2xl:col-start-1 2xl:col-end-3">
        <Card className="2xl:hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Trainings</CardTitle>
              <Button>Add training</Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="flex flex-1 overflow-hidden">
          <TrainingsList />
        </Card>
      </section>
      <section className="hidden overflow-hidden 2xl:flex">
        <Card className="flex h-full flex-1 flex-col overflow-hidden 2xl:col-start-3 2xl:col-end-4">
          <CardHeader className="border-b">
            <CardTitle>Add training</CardTitle>
          </CardHeader>
          <CardContent className="grow overflow-y-auto p-6">
            <AddTrainingForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
