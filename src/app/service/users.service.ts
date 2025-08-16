import { users } from '../../generated/prisma';
import { UsersRepository } from '../user/users.repository';
import { Prisma } from '../../generated/prisma';

export interface CreateUserInput {
  identity: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: Date;
  phone_number: string;
  trn: string;
  street_address: string;
  city: string;
  country: string;
  email?: string;
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
}

export interface UpdateUserInput {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  dob?: Date;
  phone_number?: string;
  trn?: string;
  street_address?: string;
  city?: string;
  country?: string;
  email?: string;
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
}

export interface UserSearchFilters {
  status?: string;
  country?: string;
  city?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

export class UsersService {

  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone);
  }

  private static validateTRN(trn: string): boolean {
    const trnRegex = /^\d{9}$/;
    return trnRegex.test(trn);
  }

  private static validateUserData(data: CreateUserInput): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.identity?.trim()) {
      errors.push('Identity is required');
    }

    if (!data.first_name?.trim()) {
      errors.push('First name is required');
    } else if (data.first_name.trim().length < 2) {
      errors.push('First name must be at least 2 characters');
    }

    if (!data.last_name?.trim()) {
      errors.push('Last name is required');
    } else if (data.last_name.trim().length < 2) {
      errors.push('Last name must be at least 2 characters');
    }

    if (!data.dob || isNaN(data.dob.getTime())) {
      errors.push('Valid date of birth is required');
    } else {
      const age = new Date().getFullYear() - data.dob.getFullYear();
      if (age < 18) {
        errors.push('User must be at least 18 years old');
      }
    }

    if (!data.phone_number?.trim()) {
      errors.push('Phone number is required');
    } else if (!this.validatePhoneNumber(data.phone_number)) {
      errors.push('Invalid phone number format');
    }

    if (!data.trn?.trim()) {
      errors.push('TRN is required');
    } else if (!this.validateTRN(data.trn)) {
      errors.push('TRN must be exactly 9 digits');
    }

    if (!data.street_address?.trim()) {
      errors.push('Street address is required');
    }

    if (!data.city?.trim()) {
      errors.push('City is required');
    }

    if (!data.country?.trim()) {
      errors.push('Country is required');
    }

    if (data.email && !this.validateEmail(data.email)) {
      errors.push('Invalid email format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static async createUser(input: CreateUserInput): Promise<users> {
    const validation = this.validateUserData(input);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const existingUser = await UsersRepository.findByProviderId(input.identity);
    if (existingUser) {
      throw new Error('User with this identity already exists');
    }

    if (input.email) {
      const existingEmail = await UsersRepository.findByEmail(input.email);
      if (existingEmail) {
        throw new Error('User with this email already exists');
      }
    }

    if (input.trn) {
      const existingTRN = await UsersRepository.findMany({
        where: { trn: input.trn, is_deleted: false }
      });
      if (existingTRN.length > 0) {
        throw new Error('User with this TRN already exists');
      }
    }

    const userData: Prisma.usersCreateInput = {
      identity: input.identity.trim(),
      first_name: input.first_name.trim(),
      middle_name: input.middle_name?.trim(),
      last_name: input.last_name.trim(),
      dob: input.dob,
      phone_number: input.phone_number.trim(),
      trn: input.trn.trim(),
      street_address: input.street_address.trim(),
      city: input.city.trim(),
      country: input.country.trim(),
      email: input.email?.trim(),
      status: input.status || 'pending',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date()
    };

    return UsersRepository.create(userData);
  }

  static async findByProviderId(identity: string): Promise<users | null> {
    return UsersRepository.findByProviderId(identity);
  }

  static async getUserByEmail(email: string): Promise<users | null> {
    return UsersRepository.findByEmail(email);
  }

  static async getAllUsers(params?: {
    skip?: number;
    take?: number;
    filters?: UserSearchFilters;
  }): Promise<users[]> {
    const where: Prisma.usersWhereInput = {
      is_deleted: false,
      ...(params?.filters?.status && { status: params.filters.status }),
      ...(params?.filters?.country && { country: { contains: params.filters.country, mode: 'insensitive' } }),
      ...(params?.filters?.city && { city: { contains: params.filters.city, mode: 'insensitive' } }),
      ...(params?.filters?.createdAfter && { created_at: { gte: params.filters.createdAfter } }),
      ...(params?.filters?.createdBefore && { created_at: { lte: params.filters.createdBefore } })
    };

    return UsersRepository.findMany({
      skip: params?.skip,
      take: params?.take,
      where,
      orderBy: { created_at: 'desc' }
    });
  }

  static async updateUser(identity: string, input: UpdateUserInput): Promise<users> {
    const user = await UsersRepository.findByProviderId(identity);
    if (!user || user.is_deleted) {
      throw new Error('User not found');
    }

    const updateData: Prisma.usersUpdateInput = {};

    if (input.email && input.email !== user.email) {
      if (!this.validateEmail(input.email)) {
        throw new Error('Invalid email format');
      }
      const existingEmail = await UsersRepository.findByEmail(input.email);
      if (existingEmail && existingEmail.identity !== identity) {
        throw new Error('Email already in use by another user');
      }
      updateData.email = input.email.trim();
    }

    if (input.phone_number && input.phone_number !== user.phone_number) {
      if (!this.validatePhoneNumber(input.phone_number)) {
        throw new Error('Invalid phone number format');
      }
      updateData.phone_number = input.phone_number.trim();
    }

    if (input.trn && input.trn !== user.trn) {
      if (!this.validateTRN(input.trn)) {
        throw new Error('Invalid TRN format');
      }
      const existingTRN = await UsersRepository.findMany({
        where: { trn: input.trn, is_deleted: false }
      });
      if (existingTRN.length > 0 && existingTRN[0].identity !== identity) {
        throw new Error('TRN already in use by another user');
      }
      updateData.trn = input.trn.trim();
    }

    if (input.first_name) updateData.first_name = input.first_name.trim();
    if (input.middle_name !== undefined) updateData.middle_name = input.middle_name?.trim();
    if (input.last_name) updateData.last_name = input.last_name.trim();
    if (input.dob) updateData.dob = input.dob;
    if (input.street_address) updateData.street_address = input.street_address.trim();
    if (input.city) updateData.city = input.city.trim();
    if (input.country) updateData.country = input.country.trim();
    if (input.status) updateData.status = input.status;
    updateData.updated_at = new Date();

    return UsersRepository.update({ where: { identity }, data: updateData });
  }

  static async updateUserStatus(identity: string, status: 'active' | 'inactive' | 'pending' | 'suspended'): Promise<users> {
    const user = await UsersRepository.findByProviderId(identity);
    if (!user || user.is_deleted) {
      throw new Error('User not found');
    }

    return UsersRepository.update({
      where: { identity },
      data: { status, updated_at: new Date() }
    });
  }

  static async softDeleteUser(identity: string): Promise<users> {
    const user = await UsersRepository.findByProviderId(identity);
    if (!user || user.is_deleted) {
      throw new Error('User not found');
    }

    return UsersRepository.softDelete(identity);
  }

  static async restoreUser(identity: string): Promise<users> {
    const user = await UsersRepository.findByProviderId(identity);
    if (!user || !user.is_deleted) {
      throw new Error('User not found or not deleted');
    }

    return UsersRepository.restore(identity);
  }

  static async permanentlyDeleteUser(identity: string): Promise<users> {
    const user = await UsersRepository.findByProviderId(identity);
    if (!user) {
      throw new Error('User not found');
    }

    return UsersRepository.softDelete(identity);
  }

  static async searchUsers(searchTerm: string, filters?: UserSearchFilters): Promise<users[]> {
    const where: Prisma.usersWhereInput = {
      is_deleted: false,
      OR: [
        { first_name: { contains: searchTerm, mode: 'insensitive' } },
        { last_name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { identity: { contains: searchTerm, mode: 'insensitive' } },
        { phone_number: { contains: searchTerm, mode: 'insensitive' } }
      ],
      ...(filters?.status && { status: filters.status }),
      ...(filters?.country && { country: { contains: filters.country, mode: 'insensitive' } }),
      ...(filters?.city && { city: { contains: filters.city, mode: 'insensitive' } }),
      ...(filters?.createdAfter && { created_at: { gte: filters.createdAfter } }),
      ...(filters?.createdBefore && { created_at: { lte: filters.createdBefore } })
    };

    return UsersRepository.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });
  }

  static async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    pendingUsers: number;
    suspendedUsers: number;
  }> {
    const [totalUsers, activeUsers, pendingUsers, suspendedUsers] = await Promise.all([
      UsersRepository.findMany({ where: { is_deleted: false } }).then(users => users.length),
      UsersRepository.findMany({ where: { status: 'active', is_deleted: false } }).then(users => users.length),
      UsersRepository.findMany({ where: { status: 'pending', is_deleted: false } }).then(users => users.length),
      UsersRepository.findMany({ where: { status: 'suspended', is_deleted: false } }).then(users => users.length)
    ]);

    return {
      totalUsers,
      activeUsers,
      pendingUsers,
      suspendedUsers
    };
  }

  static async getUserWithLoans(identity: string): Promise<(users & { loans?: any[] }) | null> {
    const user = await UsersRepository.findByProviderId(identity);
    if (!user || user.is_deleted) {
      return null;
    }

    // This would need to be implemented with proper loan repository integration
    return {
      ...user,
      loans: [] // Placeholder for loan data
    };
  }
}