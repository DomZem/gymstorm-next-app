import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddTrainingForm from "./components/training/add-training-form";

export default function TrainingsPage() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden md:gap-6 xl:grid-cols-3 xl:grid-rows-[1fr]">
      <section className="flex flex-col overflow-hidden xl:col-start-1 xl:col-end-4">
        {/* Trainings list */}
      </section>
      <Card className="flex h-full flex-col overflow-hidden xl:col-start-3 xl:col-end-4">
        <CardHeader className="border-b">
          <CardTitle>Add training</CardTitle>
        </CardHeader>
        <CardContent className="grow overflow-y-auto p-6">
          <AddTrainingForm />
        </CardContent>
      </Card>
    </div>
  );
}
