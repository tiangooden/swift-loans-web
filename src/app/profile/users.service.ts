import { UsersRepository } from './users.repository'

export const UserService = {
    findByIdentity: async (identity: string) => {
        let user = await UsersRepository.findByProviderId(identity);
        if (!user) {
            user = await UsersRepository.create({ identity });
        }
        return user;
    },
}
