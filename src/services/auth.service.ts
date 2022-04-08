import { PrismaClient, User } from '@prisma/client';
import { IUserData, IUserSignDTO } from '../interfaces';
import * as jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export class AuthService {
  public login = async (userData: IUserData) => {
    const user = await prisma.user.findFirst({
      where: { email: userData.email },
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
    console.log(username);
    if (username) throw new Error('User already exist');
    const user = await prisma.user.create({
      data: {username: userData.username, password: userData.password, surname: userData.surname, statusId: Number.parseInt(userData.status), email: userData.email, }
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

  public async userStatuses() {
    return await prisma.userStatus.findMany();
  }

  public async getUserData(userId: any) {
    return await prisma.user.findUnique({where: {id: userId}})
  }

  public async updateUserData(userData: IUserSignDTO, userId: number) {
    return await  prisma.user.update({
      data: {
        username: userData.username,
        password: userData.password,
        surname: userData.surname,
        email: userData.email,
        statusId: Number.parseInt(userData.status)
      },
      where: {id: userId}
    });
  }
}
