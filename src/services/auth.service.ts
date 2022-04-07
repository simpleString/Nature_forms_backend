import { PrismaClient, User } from '@prisma/client';
import { IUserData, IUserSignDTO } from '../interfaces';
import * as jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export class AuthService {
  public login = async (userData: IUserData) => {
    const user = await prisma.user.findFirst({
      where: { username: userData.username },
    });

    if (user) {
      if (user.password === userData.password) {
        const token = jwt.sign({ userId: user.id }, '' + process.env.JWT_KEY, {
          expiresIn: '108000s',
        });
        return token;
      }
    }
    throw new Error(" Password or username did't match");
  };

  public signUp = async (userData: IUserSignDTO): Promise<User> => {
    const username = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (username) throw new Error('User already exist');
    const user = await prisma.user.create({
      data: { name: userData.username, ...userData },
    });
    return user;
  };

  public getUsername = async (id: number) => {
    const username = await prisma.user.findFirst({
      where: { id },
      select: { username: true },
    });
    return username;
  };
}
