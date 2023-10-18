"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  return (
    <Button
      className="inline-flex items-center gap-2"
      onClick={() =>
        signIn("google", {
          callbackUrl: process.env.NEXT_PUBLIC_DOMAIN_URL + "/dashboard",
        })
      }
    >
      <FcGoogle />
      Sign in with google
    </Button>
  );
}
