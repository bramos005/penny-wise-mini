import { NextRequest } from "next/server";
import { prisma } from "@/app/db";

export default async function getIncome(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const externalId = searchParams.get("externalId");
    const user = await prisma.user.findUnique({
      where: {
        externalId: externalId as string,
      },
    });
    console.log(user);
    const preferences = user?.preferences;
    return new Response(JSON.stringify(preferences), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
}
