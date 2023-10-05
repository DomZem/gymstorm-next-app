import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";

export default function LoadingTrainings() {
  return (
    <Card className="flex flex-1 overflow-hidden">
      <CardHeader className="flex h-full w-full items-center justify-center gap-6 text-center">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Loading trainings
        </CardTitle>
        <Spinner />
      </CardHeader>
    </Card>
  );
}
