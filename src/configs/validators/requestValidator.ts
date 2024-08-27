import { t as TypeBox } from 'elysia';

export const createUserValidator = TypeBox.Object({
  name: TypeBox.String(),
  email: TypeBox.String({
    format: 'email',
  }),
  password: TypeBox.String(),
  confirmPassword: TypeBox.String(),
});
