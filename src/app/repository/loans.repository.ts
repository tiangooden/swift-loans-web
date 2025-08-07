import { loans, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class LoansRepository {
  
  static async create(data: Prisma.loansCreateInput): Promise<loans> {
    return prisma.loans.create({ data });
  }

  static async findById(id: number): Promise<loans | null> {
    return prisma.loans.findUnique({ where: { id } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loansWhereUniqueInput;
    where?: Prisma.loansWhereInput;
    orderBy?: Prisma.loansOrderByWithRelationInput;
  }): Promise<loans[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loans.findMany({ skip, take, cursor, where, orderBy });
  }

  static async update(params: {
    where: Prisma.loansWhereUniqueInput;
    data: Prisma.loansUpdateInput;
  }): Promise<loans> {
    const { where, data } = params;
    return prisma.loans.update({ where, data });
  }

  static async delete(where: Prisma.loansWhereUniqueInput): Promise<loans> {
    return prisma.loans.delete({ where });
  }
}