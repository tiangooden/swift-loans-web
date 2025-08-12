import { employment_details, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export const EmploymentDetailsRepository = {

  create: async (data: Prisma.employment_detailsCreateInput): Promise<employment_details> => {
    return prisma.employment_details.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.employment_detailsWhereUniqueInput;
    where?: Prisma.employment_detailsWhereInput;
    orderBy?: Prisma.employment_detailsOrderByWithRelationInput;
  }): Promise<employment_details[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.employment_details.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.employment_detailsWhereUniqueInput;
    data: Prisma.employment_detailsUpdateInput;
  }): Promise<employment_details> => {
    const { where, data } = params;
    return prisma.employment_details.update({ where, data });
  },

  delete: async (where: Prisma.employment_detailsWhereUniqueInput): Promise<employment_details> => {
    return prisma.employment_details.delete({ where });
  }
}