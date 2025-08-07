import { PrismaClient, notifications, Prisma } from '../../generated/prisma';

const prisma = new PrismaClient();

export class NotificationsRepository {
  async create(data: Prisma.notificationsCreateInput): Promise<notifications> {
    return prisma.notifications.create({ data });
  }

  async findById(id: number): Promise<notifications | null> {
    return prisma.notifications.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.notificationsWhereUniqueInput;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput;
  }): Promise<notifications[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.notifications.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.notificationsWhereUniqueInput;
    data: Prisma.notificationsUpdateInput;
  }): Promise<notifications> {
    const { where, data } = params;
    return prisma.notifications.update({ where, data });
  }

  async delete(where: Prisma.notificationsWhereUniqueInput): Promise<notifications> {
    return prisma.notifications.delete({ where });
  }
}