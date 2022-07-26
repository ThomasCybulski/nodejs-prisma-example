import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { UserDTO } from './dto/user.dto';
import { userServiceSingleton } from './user.service';

export class UserController {
  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const dto: UserDTO = plainToInstance(UserDTO, request.body);
      await userServiceSingleton.createUser(dto);

      response.status(200).send(request.body);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_request: Request, response: Response, next: NextFunction) {
    try {
      const dtos: UserDTO[] | null = await userServiceSingleton.getUsers();

      response.status(200).json(dtos);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(request: Request, response: Response, next: NextFunction) {
    try {
      const userDto: UserDTO | null = await userServiceSingleton.getUserByEmail(request.params.email);

      if (userDto === null) {
        response.status(404).send('User not found!');
      }

      response.status(200).json(userDto);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(request: Request, response: Response, next: NextFunction) {
    try {
      const requestUserDto: UserDTO = plainToInstance(UserDTO, request.body);
      const userDto: UserDTO | null = await userServiceSingleton.updateUser(requestUserDto);

      if (userDto === null) {
        response.status(404).send('User not found!');
      }

      response.status(200).json(userDto);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(request: Request, response: Response, next: NextFunction) {
    try {
      const deleteUserDto: DeleteUserDTO = plainToInstance(DeleteUserDTO, request.body);
      const userDto: UserDTO | null = await userServiceSingleton.deleteUser(deleteUserDto);

      if (userDto === null) {
        response.status(404).send('User not found!');
      }

      response.status(200).json(userDto);
    } catch (error) {
      next(error);
    }
  }
}
