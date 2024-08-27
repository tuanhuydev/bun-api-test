import { t as TypeBox } from 'elysia';

export const SignInEmailPassword = TypeBox.Object({
  email: TypeBox.String(),
  password: TypeBox.String(),
});
