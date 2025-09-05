import { repayments, Prisma } from '../../generated/prisma';
import { prisma } from '../lib/prisma';

export const RepaymentsRepository = {

  create: async (data: Prisma.repaymentsCreateInput): Promise<repayments> => {
    return prisma.repayments.create({ data });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.repaymentsWhereUniqueInput;
    where?: Prisma.repaymentsWhereInput;
    orderBy?: Prisma.repaymentsOrderByWithRelationInput;
  }): Promise<repayments[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.repayments.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.repaymentsWhereUniqueInput;
    data: Prisma.repaymentsUpdateInput;
  }): Promise<repayments> => {
    const { where, data } = params;
    return prisma.repayments.update({ where, data });
  },

  delete: async (where: Prisma.repaymentsWhereUniqueInput): Promise<repayments> => {
    return prisma.repayments.delete({ where });
  }
}