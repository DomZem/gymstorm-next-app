"use client";

import { signIn } from "next-auth/react";
import { MdLogin } from "react-icons/md";

export default function MobileSignInButton() {
  return (
    <button
      className="nav-button"
      onClick={() =>
        signIn("google", {
          callbackUrl: process.env.NEXT_PUBLIC_DOMAIN_URL + "/dashboard",
        })
      }
    >
      <MdLogin />
      Sign in
    </button>
  );
}
