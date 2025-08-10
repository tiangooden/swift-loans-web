import { capital, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export const CapitalRepository = {

  create: async (data: Prisma.capitalCreateInput): Promise<capital> => {
    return prisma.capital.create({ data });
  },

  findById: async (id: number): Promise<capital | null> => {
    return prisma.capital.findUnique({ where: { id } });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.capitalWhereUniqueInput;
    where?: Prisma.capitalWhereInput;
    orderBy?: Prisma.capitalOrderByWithRelationInput;
  }): Promise<capital[]> => {

    const { skip, take, cursor, where, orderBy } = params;
    return prisma.capital.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  },


  update: async (params: {
    where: Prisma.capitalWhereUniqueInput;
    data: Prisma.capitalUpdateInput;
  }): Promise<capital> => {
    const { where, data } = params;
    return prisma.capital.update({ where, data });
  },

  delete: async (where: Prisma.capitalWhereUniqueInput): Promise<capital> => {
    return prisma.capital.delete({ where });
  }
}