import { PrismaClient, loan_applications, Prisma } from '../../generated/prisma';

const prisma = new PrismaClient();

export class LoanApplicationsRepository {
  async create(data: Prisma.loan_applicationsCreateInput): Promise<loan_applications> {
    return prisma.loan_applications.create({ data });
  }

  async findById(id: number): Promise<loan_applications | null> {
    return prisma.loan_applications.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loan_applicationsWhereUniqueInput;
    where?: Prisma.loan_applicationsWhereInput;
    orderBy?: Prisma.loan_applicationsOrderByWithRelationInput;
  }): Promise<loan_applications[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loan_applications.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.loan_applicationsWhereUniqueInput;
    data: Prisma.loan_applicationsUpdateInput;
  }): Promise<loan_applications> {
    const { where, data } = params;
    return prisma.loan_applications.update({ where, data });
  }

  async delete(where: Prisma.loan_applicationsWhereUniqueInput): Promise<loan_applications> {
    return prisma.loan_applications.delete({ where });
  }
}