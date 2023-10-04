import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Statistics() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-2 border-b">
        <CardTitle>Statistics</CardTitle>
      </CardHeader>

      <CardContent className="h-full overflow-hidden p-0">
        <section className="border-b p-4">
          <h4 className="text-xl font-semibold">Overview</h4>
          <ul className="ml-6 list-disc text-sm [&>li]:mt-2">
            <li>
              Training days: <span className="font-medium">123 days</span>
            </li>
            <li>
              Transferred weight:{" "}
              <span className="font-medium">100 000 kg</span>
            </li>
            <li>
              Favourite exercise:{" "}
              <span className="font-medium">Bench press</span>
            </li>
          </ul>
        </section>

        <section className="p-4">
          <h4 className="text-xl font-semibold">Average</h4>
          <ul className="ml-6 list-disc text-sm [&>li]:mt-2">
            <li>
              Series per exercise: <span className="font-medium">3</span>
            </li>
            <li>
              Reps per exercise: <span className="font-medium">12</span>
            </li>
            <li>
              Break time per exercise: <span className="font-medium">1:30</span>
            </li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
