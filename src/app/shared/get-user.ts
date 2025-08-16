import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UsersRepository } from "../repository/users.repository";
import { NotFoundError, UnauthorizedError } from "./http-errors";

export default async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    if (!session) {
        // return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
        throw new UnauthorizedError('No session found');

    }
    const { id, provider } = session.user as any;
    let user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        user = await UsersRepository.create({
            identity: `${provider}|${id}`,
            email: session?.user?.email,
            first_name: session?.user?.name ?
             session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1) : '',
        });
        throw new NotFoundError('User not found');
    }
    return user;
}
