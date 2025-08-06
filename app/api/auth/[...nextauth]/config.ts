import type { NextAuthOptions, Profile } from "next-auth";

// Extiende el tipo de sesión para permitir el campo error
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
        (token as any).accessToken = account.access_token;
        (token as any).refreshToken = account.refresh_token;
        // Guardar expiresAt como timestamp en ms
        (token as any).expiresAt = account.expires_at
          ? account.expires_at * 1000
          : 0;
        (token as any).tokenType = account.token_type;
        (token as any).error = undefined;
      }
      if (profile) {
        token.profile = profile;
      }

      // Verifica que el token no haya expirado (timestamp en ms)
      if (typeof token.expiresAt === "number" && Date.now() > token.expiresAt) {
        // refresca el token
        try {
          const res = await fetch(`${BACKEND_API_URL}/o/token/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
              client_id: BACKEND_OAUTH_CLIENT_ID,
              client_secret: BACKEND_OAUTH_CLIENT_SECRET,
            }),
          });
          const data = await res.json();

          if (!res.ok) throw data;
          (token as any).accessToken = data.access_token;
          (token as any).refreshToken =
            data.refresh_token ?? token.refreshToken;
          (token as any).expiresAt = data.expires_in
            ? Date.now() + data.expires_in * 1000
            : Date.now() + 3600 * 1000;
          (token as any).tokenType = data.token_type;
          (token as any).error = undefined;
        } catch {
          (token as any).error = "RefreshAccessTokenError";
        }
      }

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
      if (token.error) {
        session.error = token.error as string;
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
