import { userService } from '../services/UserService';
import { ACCESS_TOKEN_LIFE } from '../configs/constants';

export type SignInBody = {
  email: string;
  password: string;
};

class AuthController {
  static instance: AuthController;

  makeInstance() {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  async signIn({ body, jwt }: { body: SignInBody; jwt: any }) {
    try {
      const { email, password } = body as SignInBody;
      const user = await userService.findUserByEmail(email);
      const { id: userId, email: userEmail, password: userPassword } = user;

      // TODO: hashPassword and compare with bodyPassword
      const accessToken = await jwt.sign(
        { userId, userEmail },
        { expiresIn: ACCESS_TOKEN_LIFE },
      );
      return { accessToken };
    } catch (error) {
      console.log(error);
    }
  }
}

export const authController = new AuthController().makeInstance();
