import { User } from '@prisma/client';
import { UserDTO } from './dto/user.dto';

export class UserConverter {
  /**
   * Converts the domain user into a UserDTO.
   *
   * @param {*} user
   * @returns {UserDTO[]}
   * @memberof UserConverter
   */
  static userToDTO(user: User): UserDTO {
    return {
      email: user.email,
      name: user.name,
    };
  }
}
