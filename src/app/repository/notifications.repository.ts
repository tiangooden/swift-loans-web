import { notifications, Prisma } from '../../generated/prisma';
import { prisma } from '../lib/prisma';

export const NotificationsRepository = {

  create: async (data: Prisma.notificationsCreateInput): Promise<notifications> => {
    return prisma.notifications.create({ data });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.notificationsWhereUniqueInput;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput;
  }): Promise<notifications[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.notifications.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.notificationsWhereUniqueInput;
    data: Prisma.notificationsUpdateInput;
  }): Promise<notifications> => {
    const { where, data } = params;
    return prisma.notifications.update({ where, data });
  },

  delete: async (where: Prisma.notificationsWhereUniqueInput): Promise<notifications> => {
    return prisma.notifications.delete({ where });
  }
}