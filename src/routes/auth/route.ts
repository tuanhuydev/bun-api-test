import { Elysia } from 'elysia';
import { authController } from './controller';
import { SignInEmailPassword } from './validator';

export const authHandler = new Elysia({ prefix: '/auth' })
  .post('/sign-in', authController.signIn, {
    body: SignInEmailPassword,
  })
  .post('/sign-up', () => 'Sign up')
  .post('/forgot-password', () => 'Forgot password')
  .post('/reset-password', () => 'Reset password');
