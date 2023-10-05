import { prisma } from "@/prisma/client";

import { TrainingType } from "@/app/(application)/trainings/components/training/formSchema";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to add training" });

    const {
      title,
      description,
      date,
      hourStart,
      hourEnd,
      exercises,
    }: TrainingType = req.body;

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    // Create training
    try {
      const result = await prisma.training.create({
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
          userId: prismaUser?.id || "",
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ err: "Error creating training" });
    }
  }
}
