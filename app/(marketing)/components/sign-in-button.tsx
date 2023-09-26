"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      onClick={() =>
        signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
      }
    >
      Sign in
    </Button>
  );
}
