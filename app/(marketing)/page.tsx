import { BiStats } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { IoIosFitness } from "react-icons/io";
import { MdSportsGymnastics } from "react-icons/md";

const features = [
  {
    name: "Add training",
    icon: IoIosFitness,
    description:
      "With this feature, you can easily create a training session by providing details like the title, date, and exercises. Each exercise can include specific information such as the number of repetitions, weight, and rest time between sets.",
  },
  {
    name: "Add custom exercise",
    icon: MdSportsGymnastics,
    description:
      "This handy feature allows you to create your own exercises. In case you can't find a specific exercise in our database, you can customize and add it according to your preferences.",
  },
  {
    name: "Get statistics",
    icon: BiStats,
    description:
      "Stay informed with this feature that provides you with valuable statistics. You can track various metrics such as the total number of training sessions, your favorite exercises, or the average number of repetitions in each set. These statistics are continuously updated based on the training sessions you input.",
  },
  {
    name: "Track progress",
    icon: GoGoal,
    description:
      "Keep an eye on your progress for a particular exercise through this feature. It displays your progress in a clear chart format, offering you three options: one-repetition maximum, total weight lifted, and average performance. This allows you to monitor your improvements effectively.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="flex h-screen items-center justify-center">
        <div className="px-3">
          <h2 className="mx-auto mb-6 mt-10 max-w-3xl text-center text-5xl font-bold">
            Easiest way to manage your trainings.
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm font-medium text-muted-foreground">
            Get fit and stay on track with GymStorm! Our app makes it easy to
            log your workouts and monitor your progress. Simplify your fitness
            journey with GymStorm and reach your goals with ease.
          </p>
        </div>
      </section>
      <section className="bg-foreground py-24">
        <h2 className="text-center text-5xl font-bold text-primary-foreground">
          Features
        </h2>
        <div className="mx-auto mt-24 max-w-5xl px-3">
          <div className="flex flex-col gap-8">
            {features.map((feature, index) => (
              <article
                className={`flex ${
                  index % 2 === 0 && "flex-row-reverse"
                } gap-8`}
                key={feature.name}
              >
                <div className="hidden h-64 flex-1 items-center justify-center rounded-md bg-primary-foreground sm:flex">
                  <feature.icon className="text-7xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold uppercase text-primary-foreground">
                    {index + 1}. {feature.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
