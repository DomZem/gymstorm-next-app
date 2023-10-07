import { ExerciseDetailType } from "@/app/(application)/exercises/components/exercise-form-template";
import { defaultExercises } from "@/data";
import { prisma } from "@/prisma/client";
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
        .json({ message: "Please sing in to get exercises" });

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    // Create default exercises
    try {
      const exerciseCreationPromises = defaultExercises.map(
        async (exerciseDetail: ExerciseDetailType) => {
          await prisma.exerciseDetail.create({
            data: {
              ...exerciseDetail,
              userId: prismaUser?.id || "",
            },
          });
        },
      );

      const response = await Promise.all(exerciseCreationPromises);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(403).json({ err: "Error fetching posts" });
    }
  }
}
