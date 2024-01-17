import report from "./report-controller"

export const POST = async (req: Request) => await report.read(req);