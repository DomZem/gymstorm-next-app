import RecordsListItem from "./records-list-item";

const records = [
  {
    id: "1",
    exerciseName: "Bench press",
    recordDate: "12/06/2023",
    currentHighScore: 120,
    previousHighScore: 115,
  },
  {
    id: "2",
    exerciseName: "Squat",
    recordDate: "24/06/2023",
    currentHighScore: 170,
    previousHighScore: 165,
  },
  {
    id: "2",
    exerciseName: "Deadlift",
    recordDate: "28/08/2023",
    currentHighScore: 180,
    previousHighScore: 160,
  },
  {
    id: "3",
    exerciseName: "Sumo deadlift",
    recordDate: "29/08/2023",
    currentHighScore: 200,
    previousHighScore: 180,
  },
];

export default function RecordsList() {
  return (
    <ul className="flex w-full flex-row gap-3 overflow-x-auto md:gap-6 2xl:overflow-x-hidden">
      {records.map(
        ({
          id,
          exerciseName,
          recordDate,
          currentHighScore,
          previousHighScore,
        }) => (
          <RecordsListItem
            exerciseName={exerciseName}
            recordDate={recordDate}
            currentHighScore={currentHighScore}
            previousHighScore={previousHighScore}
            key={id}
          />
        ),
      )}
    </ul>
  );
}
