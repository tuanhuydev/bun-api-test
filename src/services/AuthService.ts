import { userService } from './UserService';

class AuthService {
  static instance: AuthService;
  private jwt: any;

  makeInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signInWithEmailPassword(email: string, password: string) {
    const user = await userService.findUserByEmail(email);
    const { id: userId, email: userEmail, password: userPassword } = user;
    // TODO: hashPassword and compare with bodyPassword

    return user;
  }
}
export const authService = new AuthService().makeInstance();
