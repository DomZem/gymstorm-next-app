import { Card } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";

export default function LoadingTrainings() {
  return (
    <Card className="flex h-full flex-1 items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <h3 className="text-lg font-semibold">Download trainings</h3>
      </div>
    </Card>
  );
}
