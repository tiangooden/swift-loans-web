import prisma from "@/app/lib/prisma";
import { bank_accounts, Prisma } from "@/generated/prisma";

export const BankAccountsRepository = {

  create: async (data: Prisma.bank_accountsCreateInput): Promise<bank_accounts> => {
    return prisma.bank_accounts.create({ data });
  },

  find: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.bank_accountsWhereUniqueInput;
    where?: Prisma.bank_accountsWhereInput;
    orderBy?: Prisma.bank_accountsOrderByWithRelationInput;
  }): Promise<bank_accounts[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.bank_accounts.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  },

  update: async (params: {
    where: Prisma.bank_accountsWhereUniqueInput;
    data: Prisma.bank_accountsUpdateInput;
  }): Promise<bank_accounts> => {
    const { where, data } = params;
    return prisma.bank_accounts.update({ where, data });
  },

  delete: async (where: Prisma.bank_accountsWhereUniqueInput): Promise<bank_accounts> => {
    return prisma.bank_accounts.delete({ where });
  }
}