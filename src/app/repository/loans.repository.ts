import { loans, Prisma } from '../../generated/prisma';
import { prisma } from '../shared/prisma';

export const LoansRepository = {

  create: async (data: Prisma.loansCreateInput): Promise<loans> => {
    return prisma.loans.create({ data });
  },

  findById: async (id: string): Promise<loans | null> => {
    return prisma.loans.findUnique({ where: { id } });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loansWhereUniqueInput;
    where?: Prisma.loansWhereInput;
    orderBy?: Prisma.loansOrderByWithRelationInput;
  }): Promise<loans[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loans.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.loansWhereUniqueInput;
    data: Prisma.loansUpdateInput;
  }): Promise<loans> => {
    const { where, data } = params;
    return prisma.loans.update({ where, data });
  },

  delete: async (where: Prisma.loansWhereUniqueInput): Promise<loans> => {
    return prisma.loans.delete({ where });
  }
}