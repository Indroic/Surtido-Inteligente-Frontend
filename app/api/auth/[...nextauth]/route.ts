// Configura aquí tu proveedor OAuth 2.0 para next-auth
// Ejemplo base para un proveedor OAuth personalizado
import type { NextAuthOptions, Profile } from "next-auth";

import NextAuth from "next-auth";
import { OAuthConfig } from "next-auth/providers";

import {
  BACKEND_API_URL,
  BACKEND_OAUTH_CLIENT_ID,
  BACKEND_OAUTH_CLIENT_SECRET,
} from "@/globals";

const SURTIDO_INTELIGENTE_PROVIDER: OAuthConfig<any> = {
  clientId: BACKEND_OAUTH_CLIENT_ID,
  clientSecret: BACKEND_OAUTH_CLIENT_SECRET,
  id: "surtido-intelligente-oauth",
  name: "Cuenta Surtido Inteligente",
  type: "oauth",
  wellKnown: `${BACKEND_API_URL}/o/.well-known/openid-configuration/`,
  authorization: { params: { scope: "openid user perms" } },
  idToken: true,
  checks: ["pkce", "state"],
  profile(profile) {
    // Desanida los campos del usuario para que estén planos en session.user
    return {
      id: profile.sub,
      ...profile,
    };
  },
};

export const authOptions: NextAuthOptions = {
  providers: [SURTIDO_INTELIGENTE_PROVIDER],
  callbacks: {
    async jwt({ token, profile }) {
      // Solo la primera vez, después del login

      if (profile) {
        token.profile = profile;
      }

      return token;
    },
    async session({ session, token }) {
      // Pasa los datos planos del usuario a session.user
      if (token.profile) {
        session.user = token.profile as Profile;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
