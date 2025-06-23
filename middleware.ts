import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.profile.is_superuser,
  },
});

export const config = { matcher: ["/dashboard/:path*"] };
