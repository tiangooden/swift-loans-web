import { loan_offers, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class LoanOffersRepository {
  async create(data: Prisma.loan_offersCreateInput): Promise<loan_offers> {
    return prisma.loan_offers.create({ data });
  }

  async findById(id: number): Promise<loan_offers | null> {
    return prisma.loan_offers.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loan_offersWhereUniqueInput;
    where?: Prisma.loan_offersWhereInput;
    orderBy?: Prisma.loan_offersOrderByWithRelationInput;
  }): Promise<loan_offers[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loan_offers.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.loan_offersWhereUniqueInput;
    data: Prisma.loan_offersUpdateInput;
  }): Promise<loan_offers> {
    const { where, data } = params;
    return prisma.loan_offers.update({ where, data });
  }

  async delete(where: Prisma.loan_offersWhereUniqueInput): Promise<loan_offers> {
    return prisma.loan_offers.delete({ where });
  }
}