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
        .json({ message: "Please sign in to get exercises" });

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    // Fetch all exercises
    try {
      const data = await prisma.exerciseDetail.findMany({
        where: {
          userId: prismaUser?.id,
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ err: "Error fetching exercises" });
    }
  }
}
