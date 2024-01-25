import { Elysia } from 'elysia';
import { createUserValidator } from '../configs/validator';
import { userController } from '../controllers/UserController';

export const userHandler = new Elysia({ prefix: '/users' }).post(
  '/create',
  userController.store,
  { body: createUserValidator },
);
