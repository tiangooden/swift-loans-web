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
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
