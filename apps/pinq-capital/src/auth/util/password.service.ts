import * as bcrypt from 'bcrypt';

export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust this value for security.
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
