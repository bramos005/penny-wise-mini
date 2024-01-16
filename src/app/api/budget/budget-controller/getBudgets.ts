import { prisma } from "@/app/db";
import { NextRequest } from "next/server";

export default async function getBudgets(req: NextRequest) {

  try {
    const searchParams = req.nextUrl.searchParams;
    const externalId = searchParams.get("externalId")
    const userWithBudgets = await prisma.user.findUnique({
      where: { externalId: externalId as string },
      include: { budgets: true },
    });
    if (userWithBudgets) {
      console.log(userWithBudgets)
      return new Response(JSON.stringify(userWithBudgets.budgets), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ message: "User Not Found" }), {
      status: 404,
    });
  } catch (err: any) {
    console.error("Error fetching budgets:", err);
    return new Response(JSON.stringify({ err: err.toString() }), {
      status: 500,
    });
  }
}
