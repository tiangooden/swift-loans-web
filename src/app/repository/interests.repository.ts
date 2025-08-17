import { interest, Prisma } from '../../generated/prisma';
import { prisma } from '../shared/prisma';

export const InterestAndFeesRepository = {

  create: async (data: Prisma.interestCreateInput): Promise<interest> => {
    return prisma.interest.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.interestWhereUniqueInput;
    where?: Prisma.interestWhereInput;
    orderBy?: Prisma.interestOrderByWithRelationInput;
  }): Promise<interest[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.interest.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.interestWhereUniqueInput;
    data: Prisma.interestUpdateInput;
  }): Promise<interest> => {
    const { where, data } = params;
    return prisma.interest.update({ where, data });
  },

  delete: async (where: Prisma.interestWhereUniqueInput): Promise<interest> => {
    return prisma.interest.delete({ where });
  }
}