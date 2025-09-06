import { UsersRepository } from "../api/users/users.repository";
import getSessionUser from "./getSessionUser";

export default async function getOrCreateSessionUser() {
    const { id, provider, name, email } = await getSessionUser();
    let user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        const [first_name, last_name] = name?.split(' ') || [];
        user = await UsersRepository.create({
            identity: `${provider}|${id}`,
            email: email,
            first_name: first_name ? first_name.charAt(0).toUpperCase() + first_name.slice(1) : '',
            last_name: last_name ? last_name.charAt(0).toUpperCase() + last_name.slice(1) : '',
        });
    }
    return user;
}
