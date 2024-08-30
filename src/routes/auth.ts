import { signInWithEmailPasswordValidator } from '@/configs/validator';
import { authController } from '@/controllers/AuthController';
import { Elysia } from 'elysia';

export const authHandler = new Elysia({ prefix: '/auth' })
  .post('/sign-in', authController.signIn, {
    body: signInWithEmailPasswordValidator,
  })
  .post('/sign-up', () => 'Sign up')
  .post('/forgot-password', () => 'Forgot password')
  .post('/reset-password', () => 'Reset password');
