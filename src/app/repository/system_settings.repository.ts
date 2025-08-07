import { system_settings, Prisma } from '../../generated/prisma';
import { prisma } from '../config/prisma';

export class SystemSettingsRepository {

    static async create(data: Prisma.system_settingsCreateInput): Promise<system_settings> {
        return prisma.system_settings.create({ data });
    }

    static async findById(id: number): Promise<system_settings | null> {
        return prisma.system_settings.findUnique({ where: { id } });
    }

    static async findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.system_settingsWhereUniqueInput;
        where?: Prisma.system_settingsWhereInput;
        orderBy?: Prisma.system_settingsOrderByWithRelationInput;
    }): Promise<system_settings[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return prisma.system_settings.findMany({ skip, take, cursor, where, orderBy });
    }

    static async update(params: {
        where: Prisma.system_settingsWhereUniqueInput;
        data: Prisma.system_settingsUpdateInput;
    }): Promise<system_settings> {
        const { where, data } = params;
        return prisma.system_settings.update({ where, data });
    }

    static async delete(where: Prisma.system_settingsWhereUniqueInput): Promise<system_settings> {
        return prisma.system_settings.delete({ where });
    }
}