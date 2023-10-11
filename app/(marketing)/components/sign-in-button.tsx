"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: process.env.NEXT_PUBLIC_DOMAIN_URL + "/dashboard",
        })
      }
    >
      Sign in
    </Button>
  );
}
