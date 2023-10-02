import { prisma } from "@/prisma/client";

import { ExerciseDetailType } from "@/app/(application)/exercises/components/exercise-form-template";
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
        .json({ message: "Please sign in to add exercise" });

    const { name, avatarUrl, avatarFallback }: ExerciseDetailType = req.body;

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    // Create exercise
    try {
      const response = await prisma.exerciseDetail.create({
        data: {
          name,
          avatarUrl,
          avatarFallback,
          userId: prismaUser?.id || "",
        },
      });

      return res.status(200).json(response);
    } catch (err) {
      return res.status(403).json({ err: "Error creating exercise" });
    }
  }
}
