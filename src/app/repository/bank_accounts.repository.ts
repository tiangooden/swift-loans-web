import { PrismaClient, bank_accounts, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class BankAccountsRepository {

  async create(data: Prisma.bank_accountsCreateInput): Promise<bank_accounts> {
    return prisma.bank_accounts.create({ data });
  }

  async findById(id: number): Promise<bank_accounts | null> {
    return prisma.bank_accounts.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.bank_accountsWhereUniqueInput;
    where?: Prisma.bank_accountsWhereInput;
    orderBy?: Prisma.bank_accountsOrderByWithRelationInput;
  }): Promise<bank_accounts[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.bank_accounts.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.bank_accountsWhereUniqueInput;
    data: Prisma.bank_accountsUpdateInput;
  }): Promise<bank_accounts> {
    const { where, data } = params;
    return prisma.bank_accounts.update({ where, data });
  }

  async delete(where: Prisma.bank_accountsWhereUniqueInput): Promise<bank_accounts> {
    return prisma.bank_accounts.delete({ where });
  }
}