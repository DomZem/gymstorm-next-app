import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";

export default function LoadingTrainings() {
  return (
    <Card className="flex h-full items-center justify-center">
      <CardHeader className="flex flex-row items-center gap-6">
        <CardTitle>Download trainings</CardTitle>
        <Spinner />
      </CardHeader>
    </Card>
  );
}
