import { system_settings, Prisma } from '../../generated/prisma';
import { prisma } from '../lib/prisma';

export const SystemSettingsRepository = {

    create: async (data: Prisma.system_settingsCreateInput): Promise<system_settings> => {
        return prisma.system_settings.create({ data });
    },

    findMany: async (params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.system_settingsWhereUniqueInput;
        where?: Prisma.system_settingsWhereInput;
        orderBy?: Prisma.system_settingsOrderByWithRelationInput;
    }): Promise<system_settings[]> => {
        const { skip, take, cursor, where, orderBy } = params;
        return prisma.system_settings.findMany({ skip, take, cursor, where, orderBy });
    },

    update: async (params: {
        where: Prisma.system_settingsWhereUniqueInput;
        data: Prisma.system_settingsUpdateInput;
    }): Promise<system_settings> => {
        const { where, data } = params;
        return prisma.system_settings.update({ where, data });
    },

    delete: async (where: Prisma.system_settingsWhereUniqueInput): Promise<system_settings> => {
        return prisma.system_settings.delete({ where });
    }
}