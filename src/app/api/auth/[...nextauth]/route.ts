import NextAuth, { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google";
import Keycloak from "next-auth/providers/keycloak"

export const authOptions: NextAuthOptions = {
    providers: [
        Keycloak({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account) {
                if (account.provider === "keycloak" && account.access_token) {
                    const decoded = JSON.parse(Buffer.from(account.access_token.split(".")[1], "base64").toString());
                    token.roles = decoded.realm_access?.roles || [];
                }
                token.picture = (profile as any)?.picture;
            }
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user = { ...session.user, id: token.id } as any;
                session.user = { ...session.user, provider: token.provider } as any;
            }
            if (token?.roles) {
                session.user = { ...session.user, roles: token.roles } as any;
            }
            if (token?.picture) {
                session.user = { ...session.user, image: token.picture } as any;
            }
            return session;
        },
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
