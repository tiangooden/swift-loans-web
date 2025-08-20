import { offers, Prisma } from '../../generated/prisma';
import { prisma } from '../shared/prisma';

export const LoanOffersRepository = {

  create: async (data: Prisma.offersCreateInput): Promise<offers> => {
    return prisma.offers.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.offersWhereUniqueInput;
    where?: Prisma.offersWhereInput;
    orderBy?: Prisma.offersOrderByWithRelationInput;
  }): Promise<offers[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.offers.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.offersWhereUniqueInput;
    data: Prisma.offersUpdateInput;
  }): Promise<offers> => {
    const { where, data } = params;
    return prisma.offers.update({ where, data });
  },

  delete: async (where: Prisma.offersWhereUniqueInput): Promise<offers> => {
    return prisma.offers.delete({ where });
  }
}