import { UserRepository } from '../repositories/user.repository'

export const UserService = {
    registerUser: async (email: string, name?: string) => {
        const existing = await UserRepository.findByIdentity(email)
        if (existing) throw new Error('User already exists')
        return UserRepository.create({ email, name })
    },

    getAllUsers: () => UserRepository.findAll()
}
