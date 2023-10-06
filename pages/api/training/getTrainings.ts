import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to get trainings" });

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    // Fetch all trainings
    try {
      const data = await prisma.training.findMany({
        where: {
          userId: prismaUser?.id || "",
        },
        include: {
          exercises: {
            include: {
              exerciseDetail: {
                select: {
                  id: true,
                  name: true,
                },
              },
              series: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ err: "Error fetching trainings" });
    }
  }
}

export type TrainingPrismaType = {
  id: string;
  title: string;
  description?: string;
  date: string;
  hourStart: string;
  hourEnd: string;
  exercises: ExercisePrismaType[];
};

export type ExercisePrismaType = {
  id: string;
  exerciseDetailId: string;
  exerciseDetail: {
    id: string;
    name: string;
  };
  series: SeriePrismaType[];
  trainingId: string;
};

export type SeriePrismaType = {
  id: string;
  reps: number;
  weight: number;
  breakTime: string;
  exerciseId: string;
};
