import { IoIosFitness } from "react-icons/io";
import { MdSportsGymnastics } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import AppLink from "./AppLink";
import AppSignOutButton from "./AppSignOutButton";

export default function AppNav() {
  return (
    <div className="flex flex-col gap-3">
      <nav className="flex flex-col gap-3">
        <AppLink href={"/dashboard"}>
          <RxDashboard className="text-base" />
          Dashboard
        </AppLink>
        <AppLink href={"/trainings"}>
          <IoIosFitness className="text-base" />
          Trainings
        </AppLink>
        <AppLink href={"/exercises"}>
          <MdSportsGymnastics className="text-base" /> Exercises
        </AppLink>
      </nav>
      <AppSignOutButton />
    </div>
  );
}
