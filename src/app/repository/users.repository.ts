import { PrismaClient, users, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class UsersRepository {
  async create(data: Prisma.usersCreateInput): Promise<users> {
    return prisma.users.create({ data });
  }

  async findById(id: number): Promise<users | null> {
    return prisma.users.findUnique({ where: { id } });
  }

  async findByIdentity(identity: string): Promise<users | null> {
    return prisma.users.findUnique({ where: { identity } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.users.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    const { where, data } = params;
    return prisma.users.update({ where, data });
  }

  async delete(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return prisma.users.delete({ where });
  }
}