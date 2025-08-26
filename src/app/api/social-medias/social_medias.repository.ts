import { Prisma, social_medias } from '@/generated/prisma';
import { prisma } from '../../shared/prisma';

export const SocialMediasRepository = {

  create: async (data: Prisma.social_mediasCreateInput): Promise<social_medias> => {
    return prisma.social_medias.create({ data });
  },

  findById: async (id: string, select?: Prisma.social_mediasSelect): Promise<social_medias | null> => {
    return prisma.social_medias.findUnique({
      where: { id },
      select,
    });
  },

  findMany: async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.social_mediasWhereUniqueInput;
    where?: Prisma.social_mediasWhereInput;
    orderBy?: Prisma.social_mediasOrderByWithRelationInput;
    select?: Prisma.social_mediasSelect;
  }): Promise<social_medias[]> => {
    const { skip, take, cursor, where, orderBy, select } = params;
    return prisma.social_medias.findMany({ skip, take, cursor, where, orderBy, select });
  },

  update: async (params: {
    where: Prisma.social_mediasWhereUniqueInput;
    data: Prisma.social_mediasUpdateInput;
  }): Promise<social_medias> => {
    const { where, data } = params;
    return prisma.social_medias.update({ where, data });
  },

  delete: async (where: Prisma.social_mediasWhereUniqueInput): Promise<social_medias> => {
    return prisma.social_medias.delete({ where });
  },

  softDelete: async (id: string): Promise<social_medias> => {
    return prisma.social_medias.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date()
      }
    });
  },

  restore: async (id: string): Promise<social_medias> => {
    return prisma.social_medias.update({
      where: { id },
      data: {
        is_deleted: false,
        deleted_at: null
      }
    });
  }
}