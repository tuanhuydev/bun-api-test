import { userService } from '@/services/UserService';
import { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE } from '@/configs/constants';
import type { SignInEmailPassword } from '@/types/user';

type SignInParams = {
  body: SignInEmailPassword;
  jwt: any;
};

class AuthController {
  static instance: AuthController;

  makeInstance() {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  async signIn({ body, jwt }: SignInParams) {
    try {
      const { email, password } = body;
      const user = await userService.findUserByEmail(email);
      if (!user) throw new Error('User not found');

      const { id: userId, email: userEmail, password: userPassword } = user;
      await Bun.password.verify(password, userPassword);

      const tokenData = { userId, userEmail };
      const accessToken = await jwt.sign(tokenData, {
        expiresIn: ACCESS_TOKEN_LIFE,
      });
      const refreshToken = await jwt.sign(tokenData, {
        expiresIn: REFRESH_TOKEN_LIFE,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
    }
  }
}

export const authController = new AuthController().makeInstance();
