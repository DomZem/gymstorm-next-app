import RecordsList from "../components/records-list";
import Statistics from "./components/statistics";
import TrainingsList from "./components/trainings-list";

export default function DashboardPage() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden md:gap-6 xl:grid-cols-4 xl:grid-rows-[1fr]">
      <section className="flex flex-col overflow-hidden md:gap-6 xl:col-start-1 xl:col-end-4">
        <RecordsList />
        <TrainingsList />
      </section>
      <section className="h-full overflow-hidden xl:col-start-4">
        <Statistics />
      </section>
    </div>
  );
}
