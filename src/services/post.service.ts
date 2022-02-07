import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import { IPostDTO } from '../interfaces';
const prisma = new PrismaClient();

export class PostService {
  public getPostById = async (id: number) => {
    return await prisma.post.findUnique({ where: { id } });
  };

  public getAllPosts = async () => {
    return await prisma.post.findMany();
  };

  public createPost = async (post: IPostDTO) => {
    return await prisma.post.create({
      data: { title: post.title, content: post.content },
    });
  };
}
