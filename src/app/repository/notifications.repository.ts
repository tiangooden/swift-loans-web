import { notifications, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class NotificationsRepository {
  
  static async create(data: Prisma.notificationsCreateInput): Promise<notifications> {
    return prisma.notifications.create({ data });
  }

  static async findById(id: number): Promise<notifications | null> {
    return prisma.notifications.findUnique({ where: { id } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.notificationsWhereUniqueInput;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput;
  }): Promise<notifications[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.notifications.findMany({ skip, take, cursor, where, orderBy });
  }

  static async update(params: {
    where: Prisma.notificationsWhereUniqueInput;
    data: Prisma.notificationsUpdateInput;
  }): Promise<notifications> {
    const { where, data } = params;
    return prisma.notifications.update({ where, data });
  }

  static async delete(where: Prisma.notificationsWhereUniqueInput): Promise<notifications> {
    return prisma.notifications.delete({ where });
  }
}