import { User } from '@prisma/client';
import { logger } from '@utils/logger';
import prisma from '../prisma-client';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserConverter } from './user.converter';

class UserService {
  constructor() {
    logger.info('[CREATED] UserService instance');
  }

  async getUsers(): Promise<UserDTO[]> {
    logger.debug(`[USER] Try to return all user entries`);

    const userEntity = await prisma.user.findMany();
    const dto: UserDTO[] = [];

    userEntity.forEach(user => {
      dto.push(UserConverter.userToDTO(user));
    });

    return dto;
  }

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    logger.debug(`[USER] Try to find user by email: ${email}`);

    const userEntity = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userEntity) {
      return null;
    }

    return UserConverter.userToDTO(userEntity);
  }

  async updateUser(dto: UserDTO): Promise<UserDTO | null> {
    logger.debug(`[USER] Try to update user by email: ${dto.email}`);

    const userEntity = await prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        name: dto.name,
        email: dto.email,
      },
    });

    if (!userEntity) {
      return null;
    }

    return UserConverter.userToDTO(userEntity);
  }

  async createUser(dto: UserDTO): Promise<UserDTO | null> {
    logger.debug(`[USER] Trying to create user: ${dto.name}`);

    const userEntity = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
      },
    });

    if (!userEntity) {
      return null;
    }

    return UserConverter.userToDTO(userEntity);
  }

  async deleteUser(dto: DeleteUserDTO): Promise<UserDTO | null> {
    logger.debug(`[USER] Trying to delete user: ${dto.email}`);

    const userEntity = await prisma.user.delete({
      where: {
        email: dto.email,
      },
    });

    if (!userEntity) {
      return null;
    }

    return UserConverter.userToDTO(userEntity);
  }
}

export const userServiceSingleton = new UserService();
