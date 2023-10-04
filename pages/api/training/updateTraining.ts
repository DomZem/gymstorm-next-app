import { TrainingType } from "@/app/(application)/trainings/components/training/formSchema";
import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to update training" });

    // Update training
    try {
      const {
        title,
        description,
        date,
        hourStart,
        hourEnd,
        exercises,
      }: TrainingType = req.body;

      const { trainingId } = req.body;

      await prisma.exercise.deleteMany({
        where: {
          trainingId,
        },
      });

      const result = await prisma.training.update({
        where: {
          id: trainingId,
        },
        data: {
          title,
          description,
          date,
          hourStart,
          hourEnd,
          exercises: {
            create: exercises.map(({ exerciseDetailId, series }) => {
              return {
                exerciseDetailId,
                series: {
                  create: series.map(({ reps, weight, breakTime }) => {
                    return {
                      reps,
                      weight,
                      breakTime,
                    };
                  }),
                },
              };
            }),
          },
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ err: "Error updating training" });
    }
  }
}
