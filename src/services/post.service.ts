import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
const prisma = new PrismaClient();

export class PostService {
  public getPostById = async (id: number) => {
    return await prisma.post.findUnique({ where: { id } });
  };

  public getAllPosts = async () => {
    return await prisma.post.findMany();
  };
}
