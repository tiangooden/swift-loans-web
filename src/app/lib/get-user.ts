import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UsersRepository } from "../api/users/users.repository";
import { UnauthorizedError } from "./http-errors";

export default async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new UnauthorizedError('No session found');
    }
    const { id, provider } = session.user as any;
    let user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        const [first_name, last_name] = session?.user?.name?.split(' ') || [];
        user = await UsersRepository.create({
            identity: `${provider}|${id}`,
            email: session?.user?.email,
            first_name: first_name ? first_name.charAt(0).toUpperCase() + first_name.slice(1) : '',
            last_name: last_name ? last_name.charAt(0).toUpperCase() + last_name.slice(1) : '',
        });
    }
    return user;
}
