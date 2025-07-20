import NextAuth, { type AuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// ✅ Extend default session types to include `accessToken` and `role`
declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        role?: string;
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/auth/login", {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!res.ok) return null;

                    const data = await res.json();
                    const user = data.user;

                    return data.token
                        ? {
                            id: user.id?.toString() || user.userId?.toString() || "", // ✅ No more crash
                            name: user.fullName || "",
                            email: user.email || "",
                            role: user.role || "user",
                            token: data.token,
                        }
                        : null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }

        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.accessToken = token.accessToken;
                session.user.role = token.role;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    // ✅ Fix: guarantee that the secret is always a string
    secret: process.env.NEXTAUTH_SECRET || "dev-secret-key",

    pages: {
        signIn: "/auth/login",
    },

    // ✅ Disable OIDC behavior to allow plain JWT token usage
    jwt: {
        encode: async ({ token }) => {
            return JSON.stringify(token);
        },
        decode: async ({ token }) => {
            return JSON.parse(token!); // ensure it's not undefined
        },
    },
};

// ✅ Export handler for both GET and POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as auth };
