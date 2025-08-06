import {
  Profile as DefaultProfile,
  JWT as DefaultJWT,
  ISODateString,
} from "next-auth";
import { OAuthConfig as DefaultOAuthConfig } from "next-auth/providers";

import { UsuarioInterface } from "@/types/users";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Profile extends DefaultProfile, UsuarioInterface {
    id: string;
  }
  interface Session {
    user?: Profile;
    expires: ISODateString;
    expiresAt?: number; // timestamp en ms
    accessToken?: string;
    refreshToken?: string;
    error?: string; // para manejar errores de refresh
  }

  interface OAuthConfig<T> extends DefaultOAuthConfig<T> {
    icon?: React.ElementType;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    profile?: Profile;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number; // timestamp en ms
    tokenType?: string;
    error?: string;
  }
}
