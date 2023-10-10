"use client";

import { signIn } from "next-auth/react";
import { MdLogin } from "react-icons/md";

export default function MobileSignInButton() {
  return (
    <button
      className="nav-button"
      onClick={() =>
        signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
      }
    >
      <MdLogin />
      Sign in
    </button>
  );
}
