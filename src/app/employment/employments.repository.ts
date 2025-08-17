import { employments, Prisma } from '../../generated/prisma';
import { prisma } from '../shared/prisma';

export const EmploymentDetailsRepository = {

  create: async (data: Prisma.employmentsCreateInput): Promise<employments> => {
    return prisma.employments.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.employmentsWhereUniqueInput;
    where?: Prisma.employmentsWhereInput;
    orderBy?: Prisma.employmentsOrderByWithRelationInput;
  }): Promise<employments[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.employments.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.employmentsWhereUniqueInput;
    data: Prisma.employmentsUpdateInput;
  }): Promise<employments> => {
    const { where, data } = params;
    return prisma.employments.update({ where, data });
  },

  delete: async (where: Prisma.employmentsWhereUniqueInput): Promise<employments> => {
    return prisma.employments.delete({ where });
  }
}