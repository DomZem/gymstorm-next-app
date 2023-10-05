import * as z from "zod";

export const serieFormSchema = z.object({
  reps: z.number().positive(),
  weight: z.number().positive().optional(),
  breakTime: z.string().refine((value) => /^([0-9]+:[0-9]+)$/.test(value), {
    message: "Break time must be in the format 'mm:ss'",
  }),
});

export const exerciseFormSchema = z.object({
  exerciseDetailId: z
    .string()
    .min(1, { message: "Exercise name must be selected." }),
  series: z.array(serieFormSchema),
});

export const trainingFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  date: z.date(),
  hourStart: z.string(),
  hourEnd: z.string(),
  exercises: z.array(exerciseFormSchema),
});

export type TrainingType = z.infer<typeof trainingFormSchema>;
