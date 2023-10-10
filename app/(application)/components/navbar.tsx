import { IoIosFitness } from "react-icons/io";
import { MdSportsGymnastics } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

import NavLink from "@/components/nav-link";
import SignOutButton from "./sign-out-button";

export default function Navbar() {
  return (
    <div className="flex flex-col gap-3">
      <nav className="flex flex-col gap-3">
        <NavLink href={"/dashboard"}>
          <RxDashboard className="text-base" />
          Dashboard
        </NavLink>
        <NavLink href={"/exercises"}>
          <MdSportsGymnastics className="text-base" /> Exercises
        </NavLink>
        <NavLink href={"/trainings"}>
          <IoIosFitness className="text-base" />
          Trainings
        </NavLink>
      </nav>
      <SignOutButton />
    </div>
  );
}
