export type UserBody = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type NewUserData = Omit<UserBody, 'confirmPassword'>;

export type SignInEmailPassword = {
  email: string;
  password: string;
};
