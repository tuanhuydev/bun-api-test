import { prismaClient } from '../configs/prisma';
import type { UserBody } from '../types/user';
import { randomUUID } from 'node:crypto';

class UserService {
  static instance: UserService;

  makeInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async findUserByEmail(email: string) {
    const user = await prismaClient.users.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');
    return user;
  }

  async createUser(data: Partial<UserBody>) {
    const user = await prismaClient.users.findUnique({
      where: { email: data.email },
    });
    if (user) throw new Error('User already exists');

    // TODO: remove permission hardcode
    const newUser = {
      ...data,
      id: randomUUID(),
      permissions: { connect: { id: 1 } },
    };
    return prismaClient.users.create({ data: newUser as any });
  }
}
export const userService = new UserService().makeInstance();
