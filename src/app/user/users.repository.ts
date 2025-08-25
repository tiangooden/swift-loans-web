import { users, Prisma } from '@/generated/prisma';
import { prisma } from '@/app/shared/prisma';

export const UsersRepository = {

  create: async (data: Prisma.usersCreateInput): Promise<users> => {
    return prisma.users.create({ data });
  },

  findByProviderId: async (identity: string): Promise<users | null> => {
    return prisma.users.findUnique({ where: { identity } });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.users.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> => {
    const { where, data } = params;
    return prisma.users.update({ where, data });
  },

  softDelete: async (identity: string): Promise<users> => {
    return prisma.users.update({
      where: { identity },
      data: {
        is_deleted: true,
        deleted_at: new Date()
      }
    });
  },

  restore: async (identity: string): Promise<users> => {
    return prisma.users.update({
      where: { identity },
      data: {
        is_deleted: false,
        deleted_at: null
      }
    });
  }
}