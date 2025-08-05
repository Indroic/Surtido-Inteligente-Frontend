// Configura aquí tu proveedor OAuth 2.0 para next-auth
// Ejemplo base para un proveedor OAuth personalizado

import NextAuth from "next-auth";

import { authOptions } from "./config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
