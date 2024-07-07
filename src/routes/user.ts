import { Elysia } from 'elysia';
import { createUserValidator } from '../configs/validator';
import { userController } from '../controllers/UserController';

export const userHandler = new Elysia({ prefix: '/users' })
  .get('/', userController.index)
  .post('/', userController.store, { body: createUserValidator })
  .patch('/', userController.update)
  .delete('/', userController.destroy);
