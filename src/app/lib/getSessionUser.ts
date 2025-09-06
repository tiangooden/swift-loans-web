import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UnauthorizedError } from "./httpErrors";

export default async function getSessionUser() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new UnauthorizedError('No session found');
    }
    return session.user as { id: string, provider: string, name: string, email: string };
}
