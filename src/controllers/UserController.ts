import type { Context } from 'elysia';
import { userService } from '../services/UserService';
import type { UserBody } from '../types/user';
import { hashPassword } from '../utils/brcypt';

class UserController implements BaseController {
  static instance: UserController;

  makeInstance(): BaseController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async store({ body }: Context): Promise<Object> {
    try {
      const { password, confirmPassword, ...restBody } = body as UserBody;
      if (!password || !confirmPassword || password !== confirmPassword) {
        throw new Error('Password does not match');
      }
      const hashedPassword = await hashPassword(password);
      const userBody: Partial<UserBody> = {
        ...restBody,
        password: hashedPassword as string,
      };

      return userService.createUser(userBody);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

export const userController = new UserController().makeInstance();
