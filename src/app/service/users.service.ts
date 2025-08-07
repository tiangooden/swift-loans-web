import { UsersRepository } from '../repository/users.repository'

// export const UserService = {
//     registerUser: async (identity: string) => {
//         const existing = await UsersRepository.findByIdentity(identity)
//         if (existing) throw new Error('User already exists')
//         return UsersRepository.create({ identity })
//     },

//     getAllUsers: () => UsersRepository.findMany({})
// }
