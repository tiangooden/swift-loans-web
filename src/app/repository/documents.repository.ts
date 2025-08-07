import { documents, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class DocumentsRepository {
  
  static async create(data: Prisma.documentsCreateInput): Promise<documents> {
    return prisma.documents.create({ data });
  }

  static async findById(id: number): Promise<documents | null> {
    return prisma.documents.findUnique({ where: { id } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.documentsWhereUniqueInput;
    where?: Prisma.documentsWhereInput;
    orderBy?: Prisma.documentsOrderByWithRelationInput;
  }): Promise<documents[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.documents.findMany({ skip, take, cursor, where, orderBy });
  }

  static async update(params: {
    where: Prisma.documentsWhereUniqueInput;
    data: Prisma.documentsUpdateInput;
  }): Promise<documents> {
    const { where, data } = params;
    return prisma.documents.update({ where, data });
  }

  static async delete(where: Prisma.documentsWhereUniqueInput): Promise<documents> {
    return prisma.documents.delete({ where });
  }
}