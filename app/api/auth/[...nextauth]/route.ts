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
    async jwt({ token, profile, account }) {
      // Solo la primera vez, después del login
      if (account) {
        // Asignamos el access_token, refresh_token y expires_at al token JWT interno de NextAuth
        (token as any).accessToken = account.access_token;
        (token as any).refreshToken = account.refresh_token;
        (token as any).expiresAt = account.expires_at; // Este es un timestamp (Unix Epoch)
        (token as any).tokenType = account.token_type;
      }
      if (profile) {
        token.profile = profile;
      }

      // verifica que el token no haya expirado
      if (token.expiresAt && token.expiresAt * 1000 < Date.now()) {
        // refresca el token
        console.log("refrescando token");
        try {
          const res = await fetch(`${BACKEND_API_URL}/o/token/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refreshToken,
            }),
          });
          const data = await res.json();

          (token as any).accessToken = data.access_token;
          (token as any).refreshToken = data.refresh_token;
          (token as any).expiresAt = data.expires_at;
          (token as any).tokenType = data.token_type;
        } catch (error) {
          throw new Error("Error al refrescar el token");
        }
        console.log("token actualizado", token);
      }
      console.log("token", token);

      return token;
    },
    async session({ session, token }) {
      // Pasa los datos planos del usuario a session.user
      if (token.profile) {
        session.user = token.profile as Profile;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken as string;
      }
      if (token.expiresAt) {
        session.expiresAt = token.expiresAt as number;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
