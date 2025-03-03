import { login, userSignInFacebook, userSignInGoogle } from "@/api/auth/auth";
import type { NextAuthConfig } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { userRoleDecoder } from "@/lib/userRoles";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password dfsadf";
}
const credentialsConfig = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    const { email, password } = credentials as any;

    console.log("Login Response ", email, password);
    const res = await login({ email, password });
    console.log("Login Response ", res);

    if (res.error) {
      return {
        error: res.data.message,
      };
    }
    return {
      email: res.data?.user?.email,
      token: res.data?.token,
      userDetails: {
        ...res.data?.user,
        account_status: Number(res.data?.user?.account_status),
      },
      role: userRoleDecoder(res.data?.user.type),
      error: undefined,
      message: res.data?.message,
    };
  },
});
const config = {
  providers: [
    credentialsConfig,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile, tokens) {
        const { sub: id, name, email, picture: image } = profile;
        const baseData = { id, name, email, image };
        const response = await userSignInGoogle({ account: tokens, profile });

        if (response.error) {
          return { ...baseData, error: response.data.message };
        } else {
          return {
            ...profile,
            email: response.data?.user?.email,
            token: response.data?.token,
            userDetails: response.data?.user,
            role: response.data?.user?.type,
            error: undefined,
            message: response.data?.message,
          };
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile, tokens) {
        console.log("profile tokens ", profile, tokens);
        const { id, name, email, picture: image } = profile;
        const baseData = { id, name, email, image };
        const response = await userSignInFacebook({ profile, account: tokens });
        if (response.error) {
          return { ...baseData, error: response.data.message };
        } else {
          return {
            ...profile,
            email: response.data?.user?.email,
            token: response.data?.token,
            userDetails: response.data?.user,
            role: response.data?.user?.type,
            error: undefined,
            message: response.data?.message,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(prop) {
      const { token, user, account, trigger, session } = prop;
      if (trigger === "update" && session) {
        console.log("hell sessio ds ", session);
        token.user = session.user;
        return token;
      }
      if (account && account.provider === "google") {
        token.user = user;
        return token;
      }
      if (account && account.provider === "facebook") {
        token.user = user;
        return token;
      }
      if (account?.provider === "credentials" && user) {
        token.user = user;
      }

      return token;
    },
    async session(props) {
      const { session, token, user, trigger, newSession } = props;
      if (token.user) {
        session.user = { ...user, ...token.user };
      }
      if (trigger === "update" && newSession?.user.userDetails) {
        console.log("session = ", newSession);

        if (session?.user?.userDetails?.is_profile_completed) {
          session.user.userDetails.is_profile_completed =
            newSession.user.userDetails?.is_profile_completed;
        }
      }
      return session;
    },
    async signIn(props) {
      const { account, profile, user } = props;
      if (account?.provider === "google") {
        if (user.error) {
          return `/login?error=${user.error}`;
        }
      }
      if (account?.provider === "facebook") {
        if (user.error) {
          return `/login?error=${user.error}`;
        }
      }
      return true;
    },
  },
  // trustHost: true,
  secret: "TEST",
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
