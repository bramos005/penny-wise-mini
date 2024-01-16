import { prisma } from "@/app/db";
import { constants } from "buffer";

export default async function updateIncome(req: Request) {
  try {
    const { externalId, income } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        externalId: externalId,
      },
    });

    if (user) {
      const preferences = user.preferences;
      const updatedUser = await prisma.user.update({
        where: {
          externalId: externalId,
        },
        data: {
          preferences: { ...(preferences as object), income },
        },
      });
    }
    return new Response(JSON.stringify({ message: "user updated" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ err }), {
      status: 500,
    });
  }
}
