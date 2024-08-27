import type { Context } from 'elysia';
import { userService } from '../services/UserService';
import type { NewUserData, UserBody } from '../types/user';
import { z } from 'zod';

class UserController implements BaseController {
  update(data: Object): Promise<Object> {
    throw new Error('Method not implemented.');
  }
  destroy(data: Object): Promise<Object> {
    throw new Error('Method not implemented.');
  }
  index(): Promise<Object[]> {
    throw new Error('Method not implemented.');
  }
  show(data: Object): Promise<Object> {
    throw new Error('Method not implemented.');
  }
  static instance: UserController;

  makeInstance(): BaseController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async store({ body }: Context): Promise<Object> {
    try {
      const schema = z
        .object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
          confirmPassword: z.string(),
        })
        .refine(
          (data) => {
            return data.password === data.confirmPassword;
          },
          { message: 'Password does not match', path: ['password'] },
        );
      const validatedBody = schema.parse(body);
      const { confirmPassword, password, ...restBody } = validatedBody;

      const hashedPassword: string = await Bun.password.hash(password);
      const userBody: NewUserData = {
        ...restBody,
        password: hashedPassword,
      };

      return userService.createUser(userBody);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

export const userController = new UserController().makeInstance();
