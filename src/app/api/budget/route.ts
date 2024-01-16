import { NextRequest } from "next/server";
import budget from "./budget-controller";

export const POST = async (req: Request) => await budget.create(req);
export const GET = async (req: NextRequest) => await budget.read(req);
export const DELETE = async (req: Request) => await budget.destroy(req);
