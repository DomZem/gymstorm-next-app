import { Card } from "@/components/ui/card";
import { IoIosBug } from "react-icons/io";

export default function ErrorTrainings() {
  return (
    <Card className="flex h-full flex-1 items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        <IoIosBug className="text-6xl" />
        <h3 className="text-lg font-semibold">Error</h3>
        <p className="text-sm text-muted-foreground">
          An error occurred while retrieving data from the server. Try maybe
          later!
        </p>
      </div>
    </Card>
  );
}
