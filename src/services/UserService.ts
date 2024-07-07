import UserRepository from '@/repositories/UserRepository';
import type { NewUserData } from '@/types/user';
import { randomUUID } from 'crypto';

class UserService {
  static instance: UserService;

  makeInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async findUserByEmail(email: string) {
    const user = await UserRepository.getUserByEmail(email);
    console.log(user);
    if (!user) throw new Error('User not found');
    return user;
  }

  async createUser({ email, ...restUserBody }: NewUserData) {
    const user = await UserRepository.getUserByEmail(email);
    if (user) throw new Error('User already exists');

    // TODO: remove permission hardcode
    const newUser = {
      ...restUserBody,
      id: randomUUID(),
    };
    return newUser;
    // return prismaClient.users.create({ data: newUser as any });
  }
}
export const userService = new UserService().makeInstance();
