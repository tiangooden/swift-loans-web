import { users, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class UsersRepository {
  static async create(data: Prisma.usersCreateInput): Promise<users> {
    return prisma.users.create({ data });
  }

  static async findById(id: number): Promise<users | null> {
    return prisma.users.findUnique({ where: { id } });
  }

  static async findByIdentity(identity: string): Promise<users | null> {
    return prisma.users.findUnique({ where: { identity } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.users.findMany({ skip, take, cursor, where, orderBy });
  }

  static async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    const { where, data } = params;
    return prisma.users.update({ where, data });
  }

  static async delete(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return prisma.users.delete({ where });
  }
}