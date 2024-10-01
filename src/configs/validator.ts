import { t as TypeBox } from 'elysia';
import { TERM_ENUM } from './constants';

export const signInWithEmailPasswordValidator = TypeBox.Object({
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

export const createTermValidator = TypeBox.Object({
  name: TypeBox.String(),
  type: TypeBox.Enum(TERM_ENUM),
  ipa: TypeBox.String(),
  meaning: TypeBox.String(),
  example: TypeBox.String(),
});
