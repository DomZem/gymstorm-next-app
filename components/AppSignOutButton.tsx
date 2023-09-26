"use client";

import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

export default function AppSignOutButton() {
  return (
    <button className="nav-button" onClick={() => signOut()}>
      <MdLogout />
      Sign out
    </button>
  );
}
