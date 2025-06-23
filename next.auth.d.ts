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
  interface JWT extends DefaultJWT {
    profile?: Profile;
  }

  interface Profile extends DefaultProfile, UsuarioInterface {
    id: string;
  }
  interface Session {
    user?: Profile;
    expires: ISODateString;
  }

  interface OAuthConfig<T> extends DefaultOAuthConfig<T> {
    icon?: React.ElementType;
  }
}
