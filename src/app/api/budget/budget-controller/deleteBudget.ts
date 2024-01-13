import prisma from "@/app/db";

export default async (req: Request) => {
  try {
      const { id } = await req.json();
     
    const deleteBudget = await prisma.budget.delete({
      where: {
        id: id,
      },
    });
    return new Response(
      JSON.stringify({ message: "budget succesfully deleted" }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.error("Failed to delete budget:", err);
    return new Response(JSON.stringify({ err: err.toString() }), {
      status: 500,
    });
  }
};
