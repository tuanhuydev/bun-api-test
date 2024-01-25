import { Elysia } from 'elysia';
import { authController } from '../controllers/AuthController';
import { signInValidator } from '../configs/validator';

export const authHandler = new Elysia({ prefix: '/auth' })
  .post('/sign-in', authController.signIn, { body: signInValidator })
  .post('/sign-up', () => 'Sign up')
  .post('/forgot-password', () => 'Forgot password')
  .post('/reset-password', () => 'Reset password');
