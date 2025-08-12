import { documents, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export const DocumentsRepository = {

  create: async (data: Prisma.documentsCreateInput): Promise<documents> => {
    return prisma.documents.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.documentsWhereUniqueInput;
    where?: Prisma.documentsWhereInput;
    orderBy?: Prisma.documentsOrderByWithRelationInput;
  }): Promise<documents[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.documents.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.documentsWhereUniqueInput;
    data: Prisma.documentsUpdateInput;
  }): Promise<documents> => {
    const { where, data } = params;
    return prisma.documents.update({ where, data });
  },

  delete: async (where: Prisma.documentsWhereUniqueInput): Promise<documents> => {
    return prisma.documents.delete({ where });
  }
}