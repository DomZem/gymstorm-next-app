"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        style: {
          backgroundColor: theme === "light" ? "#020817" : "#ffffff",
          color: theme === "light" ? "#ffffff" : "#020817",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
      }}
    />
  );
}
