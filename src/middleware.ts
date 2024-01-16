import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ publicRoutes: ["/api/webhooks/user", "/api/budget"] });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
