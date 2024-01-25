import { t as TypeBox } from 'elysia';

export const signInValidator = TypeBox.Object({
  email: TypeBox.String(),
  password: TypeBox.String(),
});

export const createUserValidator = TypeBox.Object({
  name: TypeBox.String(),
  email: TypeBox.String({
    format: 'email',
  }),
  password: TypeBox.String(),
  confirmPassword: TypeBox.String(),
});
