import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};


// middleware.ts
// import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default withClerkMiddleware((req) => {
//   const { userId } = getAuth(req);
//   const publicPaths = ["/sign-in", "/sign-up"];

//   // Handle the redirect logic
//   if (!userId && !publicPaths.includes(req.nextUrl.pathname)) {
//     const signInUrl = new URL("/sign-in", req.url);
//     signInUrl.searchParams.set("redirect_url", req.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|public|_static|_vercel|_middleware).*)"],
// };

