import { bank_accounts, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class BankAccountsRepository {

  static async create(data: Prisma.bank_accountsCreateInput): Promise<bank_accounts> {
    return prisma.bank_accounts.create({ data });
  }

  static async findById(id: number): Promise<bank_accounts | null> {
    return prisma.bank_accounts.findUnique({ where: { id } });
  }

  static async findMany(params: {
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

  static async update(params: {
    where: Prisma.bank_accountsWhereUniqueInput;
    data: Prisma.bank_accountsUpdateInput;
  }): Promise<bank_accounts> {
    const { where, data } = params;
    return prisma.bank_accounts.update({ where, data });
  }

  static async delete(where: Prisma.bank_accountsWhereUniqueInput): Promise<bank_accounts> {
    return prisma.bank_accounts.delete({ where });
  }
}