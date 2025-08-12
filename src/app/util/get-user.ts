import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UsersRepository } from "../profile/users.repository";
import { NotFoundError, UnauthorizedError } from "./http-errors";

export default async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    if (!session) {
        // return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
        throw new UnauthorizedError('No session found');

    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        // return NextResponse.json({ error: 'User not found' }, { status: 404 });
        throw new NotFoundError('User not found');
    }
    return user;
}
