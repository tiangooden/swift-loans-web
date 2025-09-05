import prisma from "@/app/lib/prisma";
import { Prisma, references } from "@/generated/prisma";

export const ReferencesRepository = {

  create: async (data: Prisma.referencesCreateInput): Promise<references> => {
    return prisma.references.create({ data });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.referencesWhereUniqueInput;
    where?: Prisma.referencesWhereInput;
    orderBy?: Prisma.referencesOrderByWithRelationInput;
  }): Promise<references[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.references.findMany({ skip, take, cursor, where, orderBy });
  },

  update: async (params: {
    where: Prisma.referencesWhereUniqueInput;
    data: Prisma.referencesUpdateInput;
  }): Promise<references> => {
    const { where, data } = params;
    return prisma.references.update({ where, data });
  },

  delete: async (where: Prisma.referencesWhereUniqueInput): Promise<references> => {
    return prisma.references.delete({ where });
  }
}