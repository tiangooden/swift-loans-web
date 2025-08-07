import { repayments, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class RepaymentsRepository {
  async create(data: Prisma.repaymentsCreateInput): Promise<repayments> {
    return prisma.repayments.create({ data });
  }

  async findById(id: number): Promise<repayments | null> {
    return prisma.repayments.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.repaymentsWhereUniqueInput;
    where?: Prisma.repaymentsWhereInput;
    orderBy?: Prisma.repaymentsOrderByWithRelationInput;
  }): Promise<repayments[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.repayments.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.repaymentsWhereUniqueInput;
    data: Prisma.repaymentsUpdateInput;
  }): Promise<repayments> {
    const { where, data } = params;
    return prisma.repayments.update({ where, data });
  }

  async delete(where: Prisma.repaymentsWhereUniqueInput): Promise<repayments> {
    return prisma.repayments.delete({ where });
  }

}