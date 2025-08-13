import { loan_applications, Prisma } from '../../generated/prisma';
import { prisma } from '../shared/prisma';

export const LoanApplicationsRepository = {

  create: async (data: Prisma.loan_applicationsCreateInput): Promise<loan_applications> => {
    return prisma.loan_applications.create({ data });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loan_applicationsWhereUniqueInput;
    where?: Prisma.loan_applicationsWhereInput;
    orderBy?: Prisma.loan_applicationsOrderByWithRelationInput;
  }): Promise<loan_applications[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loan_applications.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.loan_applicationsWhereUniqueInput;
    data: Prisma.loan_applicationsUpdateInput;
  }): Promise<loan_applications> => {
    const { where, data } = params;
    return prisma.loan_applications.update({ where, data });
  },

  delete: async (where: Prisma.loan_applicationsWhereUniqueInput): Promise<loan_applications> => {
    return prisma.loan_applications.delete({ where });
  }
}