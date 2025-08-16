import { applications, Prisma } from '../../generated/prisma';
import { prisma } from '../shared/prisma';

export const LoanApplicationsRepository = {

  create: async (data: Prisma.applicationsCreateInput): Promise<applications> => {
    return prisma.applications.create({ data });
  },

  findById: async (id: number, include?: Prisma.applicationsInclude): Promise<applications | null> => {
    return prisma.applications.findUnique({
      where: { id },
      include,
    });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.applicationsWhereUniqueInput;
    where?: Prisma.applicationsWhereInput;
    orderBy?: Prisma.applicationsOrderByWithRelationInput;
    include?: Prisma.applicationsInclude;
  }): Promise<applications[]> => {
    const { skip, take, cursor, where, orderBy, include } = params;
    return prisma.applications.findMany({ skip, take, cursor, where, orderBy, include });
  },

  update: async (params: {
    where: Prisma.applicationsWhereUniqueInput;
    data: Prisma.applicationsUpdateInput;
  }): Promise<applications> => {
    const { where, data } = params;
    return prisma.applications.update({ where, data });
  },

  delete: async (where: Prisma.applicationsWhereUniqueInput): Promise<applications> => {
    return prisma.applications.delete({ where });
  },

  softDelete: async (id: number): Promise<applications> => {
    return prisma.applications.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date()
      }
    });
  },

  restore: async (id: number): Promise<applications> => {
    return prisma.applications.update({
      where: { id },
      data: {
        is_deleted: false,
        deleted_at: null
      }
    });
  }
}