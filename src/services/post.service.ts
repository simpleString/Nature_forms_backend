import { Prisma, PrismaClient } from '@prisma/client';
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

  public getAllPostsWithUserResult = async (userId: number) => {
    // const result = await prisma.$queryRaw(Prisma.sql`SELECT * FROM Post WHERE `)
    let results = await prisma.post.findMany({
      include: {
        _count: { select: { tests: true } },
        userResults: { where: { userId } },
      },
    });
    console.log(results);

    return results.map((result) => {
      return {
        id: result.id,
        content: result.content,
        title: result.title,
        maxResult:
          result.userResults.length > 0
            ? result.userResults.reduce((max, userResult) =>
                max.result > userResult.result ? max : userResult
              ).result
            : 0,
        _count: result._count,
      };
    });
  };
}
