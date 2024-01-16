import { NextRequest } from "next/server";
import income from "./income-controller";

export const PUT = async (req: Request) => await income.update(req);
export const GET = async (req: NextRequest) => await income.read(req);