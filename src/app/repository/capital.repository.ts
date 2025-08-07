import { capital, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class CapitalRepository {

  static async create(data: Prisma.capitalCreateInput): Promise<capital> {
    return prisma.capital.create({ data });
  }

  static async findById(id: number): Promise<capital | null> {
    return prisma.capital.findUnique({ where: { id } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.capitalWhereUniqueInput;
    where?: Prisma.capitalWhereInput;
    orderBy?: Prisma.capitalOrderByWithRelationInput;
  }): Promise<capital[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.capital.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  static async update(params: {
    where: Prisma.capitalWhereUniqueInput;
    data: Prisma.capitalUpdateInput;
  }): Promise<capital> {
    const { where, data } = params;
    return prisma.capital.update({ where, data });
  }

  static async delete(where: Prisma.capitalWhereUniqueInput): Promise<capital> {
    return prisma.capital.delete({ where });
  }
}