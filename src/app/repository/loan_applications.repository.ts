import { loan_applications, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class LoanApplicationsRepository {
  
  static async create(data: Prisma.loan_applicationsCreateInput): Promise<loan_applications> {
    return prisma.loan_applications.create({ data });
  }

  static async findById(id: number): Promise<loan_applications | null> {
    return prisma.loan_applications.findUnique({ where: { id } });
  }

  static async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.loan_applicationsWhereUniqueInput;
    where?: Prisma.loan_applicationsWhereInput;
    orderBy?: Prisma.loan_applicationsOrderByWithRelationInput;
  }): Promise<loan_applications[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.loan_applications.findMany({ skip, take, cursor, where, orderBy });
  }

  static async update(params: {
    where: Prisma.loan_applicationsWhereUniqueInput;
    data: Prisma.loan_applicationsUpdateInput;
  }): Promise<loan_applications> {
    const { where, data } = params;
    return prisma.loan_applications.update({ where, data });
  }

  static async delete(where: Prisma.loan_applicationsWhereUniqueInput): Promise<loan_applications> {
    return prisma.loan_applications.delete({ where });
  }
}