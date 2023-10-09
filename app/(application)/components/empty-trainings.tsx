import { Card } from "@/components/ui/card";
import { IoIosFitness } from "react-icons/io";

export default function EmptyTrainings() {
  return (
    <Card className="flex h-full flex-1 items-center justify-center overflow-hidden p-6">
      <div className="flex flex-col items-center text-center">
        <IoIosFitness className="text-6xl" />
        <h3 className="text-lg font-semibold">No trainings added</h3>
        <p className="text-sm text-muted-foreground">
          You have not added any trainings. Add at least one to display specific
          data.
        </p>
      </div>
    </Card>
  );
}
