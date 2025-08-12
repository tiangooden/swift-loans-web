import { interest_and_fees, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export const InterestAndFeesRepository = {

  create: async (data: Prisma.interest_and_feesCreateInput): Promise<interest_and_fees> => {
    return prisma.interest_and_fees.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.interest_and_feesWhereUniqueInput;
    where?: Prisma.interest_and_feesWhereInput;
    orderBy?: Prisma.interest_and_feesOrderByWithRelationInput;
  }): Promise<interest_and_fees[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.interest_and_fees.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.interest_and_feesWhereUniqueInput;
    data: Prisma.interest_and_feesUpdateInput;
  }): Promise<interest_and_fees> => {
    const { where, data } = params;
    return prisma.interest_and_fees.update({ where, data });
  },

  delete: async (where: Prisma.interest_and_feesWhereUniqueInput): Promise<interest_and_fees> => {
    return prisma.interest_and_fees.delete({ where });
  }
}