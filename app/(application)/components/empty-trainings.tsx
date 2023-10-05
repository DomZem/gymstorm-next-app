import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import emptyImage from "@/public/empty.svg";
import Image from "next/image";

export default function EmptyTrainings() {
  return (
    <Card className="flex flex-1 items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-3">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold tracking-tight">
            You have no training. Create a first one!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Image
            width={0}
            height={0}
            style={{ width: "65%", height: "auto" }}
            src={emptyImage}
            alt="sad face"
          />
        </CardContent>
      </div>
    </Card>
  );
}
