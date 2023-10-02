import { prisma } from "@/prisma/client";
import { ExerciseDetail } from "@prisma/client";
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
        .json({ message: "Please sign in to update exercise" });

    // Update exercise
    try {
      const { id, name, avatarUrl, avatarFallback }: ExerciseDetail = req.body;

      // Get user
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
      });

      const result = await prisma.exerciseDetail.upsert({
        where: {
          id,
        },
        update: {
          name,
          avatarUrl,
          avatarFallback,
        },
        create: {
          name,
          avatarFallback,
          avatarUrl,
          userId: prismaUser?.id || "",
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ err: "Error updating exercise" });
    }
  }
}
