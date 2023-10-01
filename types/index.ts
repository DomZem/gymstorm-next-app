import { exerciseDetailFormSchema } from "@/app/(application)/exercises/components/add-exercise-form";
import * as z from "zod";

export type ExerciseDetailType = z.infer<typeof exerciseDetailFormSchema>;
