import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddTrainingForm from "./components/training/add-training-form";
import TrainingsList from "./components/trainings-list";

export default function TrainingsPage() {
  return (
    <div className="grid h-full overflow-hidden xl:gap-6 2xl:grid-cols-3 2xl:grid-rows-[1fr]">
      <section className="flex flex-col gap-3 overflow-hidden 2xl:col-start-1 2xl:col-end-3">
        <Dialog>
          <Card className="2xl:hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>Trainings</CardTitle>
                <DialogTrigger asChild>
                  <Button>Add training</Button>
                </DialogTrigger>
              </div>
            </CardHeader>
          </Card>
          <DialogContent className="max-h-[90%] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add training</DialogTitle>
            </DialogHeader>
            <AddTrainingForm />
          </DialogContent>
        </Dialog>

        <TrainingsList />
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
