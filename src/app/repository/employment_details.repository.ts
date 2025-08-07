import { employment_details, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class EmploymentDetailsRepository {
  async create(data: Prisma.employment_detailsCreateInput): Promise<employment_details> {
    return prisma.employment_details.create({ data });
  }

  async findById(user_id: number): Promise<employment_details | null> {
    return prisma.employment_details.findUnique({ where: { user_id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.employment_detailsWhereUniqueInput;
    where?: Prisma.employment_detailsWhereInput;
    orderBy?: Prisma.employment_detailsOrderByWithRelationInput;
  }): Promise<employment_details[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.employment_details.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.employment_detailsWhereUniqueInput;
    data: Prisma.employment_detailsUpdateInput;
  }): Promise<employment_details> {
    const { where, data } = params;
    return prisma.employment_details.update({ where, data });
  }

  async delete(where: Prisma.employment_detailsWhereUniqueInput): Promise<employment_details> {
    return prisma.employment_details.delete({ where });
  }

}