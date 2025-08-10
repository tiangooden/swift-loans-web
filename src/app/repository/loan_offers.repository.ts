import { loan_offers, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export const LoanOffersRepository = {

  create: async (data: Prisma.loan_offersCreateInput): Promise<loan_offers> => {
    return prisma.loan_offers.create({ data });
  },

  findById: async (id: number): Promise<loan_offers | null> => {
    return prisma.loan_offers.findUnique({ where: { id } });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loan_offersWhereUniqueInput;
    where?: Prisma.loan_offersWhereInput;
    orderBy?: Prisma.loan_offersOrderByWithRelationInput;
  }): Promise<loan_offers[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loan_offers.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.loan_offersWhereUniqueInput;
    data: Prisma.loan_offersUpdateInput;
  }): Promise<loan_offers> => {
    const { where, data } = params;
    return prisma.loan_offers.update({ where, data });
  },

  delete: async (where: Prisma.loan_offersWhereUniqueInput): Promise<loan_offers> => {
    return prisma.loan_offers.delete({ where });
  }
}