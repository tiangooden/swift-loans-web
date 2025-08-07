import { prisma } from '../config/prisma'

export const UserRepository = {
    create: async (data: any) => {
        return prisma.users.create({ data })
    },

    findByIdentity: async (identity: string) => {
        return prisma.users.findUnique({ where: { identity } })
    },

    findAll: async () => {
        return prisma.users.findMany()
    }
}
