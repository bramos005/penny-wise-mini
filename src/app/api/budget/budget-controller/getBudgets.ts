import prisma from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: Request) => {
  try {
    const budgets = await prisma.budget.findMany();
    return new Response(JSON.stringify(budgets), {
      status: 200,
    });
  } catch (err: any) {
    console.error("Error fetching budgets:", err);
    return new Response(JSON.stringify({ err: err.toString() }), {
      status: 500
    });
  }
};
