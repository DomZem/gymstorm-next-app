import { ExercisePrismaType } from "@/pages/api/training/getTrainings";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSessionTime = (hourStart: string, hourEnd: string): string => {
  const startParts = hourStart.split(":");
  const endParts = hourEnd.split(":");

  const startHour = parseInt(startParts[0]);
  const startMinute = parseInt(startParts[1]);

  const endHour = parseInt(endParts[0]);
  const endMinute = parseInt(endParts[1]);

  const hourDiff = endHour - startHour;
  const minuteDiff = endMinute - startMinute;

  let result = "";

  if (hourDiff > 0) {
    result += `${hourDiff} hour${hourDiff > 1 ? "s" : ""}`;
  }

  if (minuteDiff > 0) {
    if (result) {
      result += " ";
    }
    result += `${minuteDiff} minute${minuteDiff > 1 ? "s" : ""}`;
  }

  return result || "0 minutes";
};

export const getTotalKg = (exercises: ExercisePrismaType[]): number => {
  let result = 0;

  exercises.forEach(({ series }) => {
    series.forEach(({ reps, weight }) => {
      result += reps * weight;
    });
  });

  return result;
};
