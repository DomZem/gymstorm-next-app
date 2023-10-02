import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to delete exercise" });

    // Delete exercise
    try {
      const exerciseId = req.body;

      const result = await prisma.exerciseDetail.delete({
        where: {
          id: exerciseId,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ err: "Error deleting exercise" });
    }
  }
}
