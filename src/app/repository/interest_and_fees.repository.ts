import { interest_and_fees, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class InterestAndFeesRepository {
  
  static async create(data: Prisma.interest_and_feesCreateInput): Promise<interest_and_fees> {
    return prisma.interest_and_fees.create({ data });
  }

  static async findById(id: number): Promise<interest_and_fees | null> {
    return prisma.interest_and_fees.findUnique({ where: { id } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.interest_and_feesWhereUniqueInput;
    where?: Prisma.interest_and_feesWhereInput;
    orderBy?: Prisma.interest_and_feesOrderByWithRelationInput;
  }): Promise<interest_and_fees[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.interest_and_fees.findMany({ skip, take, cursor, where, orderBy });
  }

  static async update(params: {
    where: Prisma.interest_and_feesWhereUniqueInput;
    data: Prisma.interest_and_feesUpdateInput;
  }): Promise<interest_and_fees> {
    const { where, data } = params;
    return prisma.interest_and_fees.update({ where, data });
  }

  static async delete(where: Prisma.interest_and_feesWhereUniqueInput): Promise<interest_and_fees> {
    return prisma.interest_and_fees.delete({ where });
  }
}