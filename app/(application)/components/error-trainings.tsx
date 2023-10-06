import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import errorImage from "@/public/error.svg";
import Image from "next/image";

export default function ErrorTrainings() {
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
