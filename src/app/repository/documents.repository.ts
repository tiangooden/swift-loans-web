import { documents, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class DocumentsRepository {
  async create(data: Prisma.documentsCreateInput): Promise<documents> {
    return prisma.documents.create({ data });
  }

  async findById(id: number): Promise<documents | null> {
    return prisma.documents.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.documentsWhereUniqueInput;
    where?: Prisma.documentsWhereInput;
    orderBy?: Prisma.documentsOrderByWithRelationInput;
  }): Promise<documents[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.documents.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.documentsWhereUniqueInput;
    data: Prisma.documentsUpdateInput;
  }): Promise<documents> {
    const { where, data } = params;
    return prisma.documents.update({ where, data });
  }

  async delete(where: Prisma.documentsWhereUniqueInput): Promise<documents> {
    return prisma.documents.delete({ where });
  }
}