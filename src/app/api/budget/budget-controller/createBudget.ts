import prisma from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: Request) => {
  try {
    const { name, amount }  = await req.json();
    const newBudget = await prisma.budget.create({
      data: {
        name: name,
        amount: Number(amount),
      },
    });
    return (
      new Response(
        JSON.stringify({ budgetCreated: { name: name,amount: amount } })
      ,
      {
        status: 200,
      }
    ))
  } catch (err:any) {
    console.error("Error creating Budget:", err);
    return new Response(JSON.stringify({ err: err.toString() }), {
      status: 500,
    });
  }
};
