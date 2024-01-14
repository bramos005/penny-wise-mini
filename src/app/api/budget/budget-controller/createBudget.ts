import prisma from "@/app/db";
import { Budget } from "@prisma/client";
export default async function createBudget(req: Request) {
  try {
    const { name, amount, category, frequency } = await req.json();
    const newBudget = await prisma.budget.create({
      data: {
        name,
        amount: parseFloat(amount),
        category,
        frequency,
      },
    });
    return new Response(
      JSON.stringify({ budgetCreated: { frequency, category, name, amount } }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.error("Error creating Budget:", err);
    return new Response(JSON.stringify({ err: err.toString() }), {
      status: 500,
    });
  }
}
