import {  PrismaClient } from '@prisma/client';
import { IPostDTO } from '../interfaces';
const prisma = new PrismaClient();

export class PostService {
  public getPostById = async (id: number) => {
    const post = await prisma.post.findUnique({ where: { id }, include: {tests: true} });
    const previousPost = await prisma.post.findFirst({orderBy: {id: 'desc'}, where: {id: {lt: post?.id}, categoryId: post?.categoryId}, select: {id: true}})
    const nextPost = await prisma.post.findFirst({orderBy: {id: 'asc'}, where: {id: {gt: post?.id}, categoryId: post?.categoryId}, select: {id: true}})
    // const anotherPosts = await  prisma.post.findMany({where: {OR: [{id: {lt: post?.id}}, {id: {gt: post?.id}}], AND: {categoryId: post?.categoryId}}, select: {id: true}})
    // const nearPosts = {prev: null, next: null}
    // anotherPosts.map(postIterator => {
    //
    // })
    console.log(previousPost);
    console.log(nextPost);

    return {post, previousPost, nextPost};

  };

  public getAllPosts = async () => {
    return await prisma.postCategory.findMany({include: {posts: true}})
  };

  public createPost = async (post: IPostDTO) => {
    return await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        categoryId: post.categoryId,
        img: post.img
      },
    });
  };

  public getAllPostsWithUserResult = async (userId: number) => {

    //SQL
    let results = await prisma.post.findMany({
      include: {
        _count: { select: { tests: true } },
        userResults: { where: { userId } },
        category: {select: {name: true}}
      },
    });
    ///

    const anotherResult =  results.map((result) => ({

        id: result.id,
        content: result.content,
        title: result.title,
        category: result.category.name,
        maxResult:
          result.userResults.length > 0
            ? result.userResults.reduce((max, userResult) =>
              max.result > userResult.result ? max : userResult
            ).result
            : 0,
        _count: result._count,

    }));
    const userResult: any = {}
    const score: any = {}
    anotherResult.forEach(result => {
      if (!(result.category in userResult)) {
        userResult[result.category] = 0
        score[result.category] = 0
      }
      score[result.category] += result._count.tests
      userResult[result.category] += result.maxResult
    })

    return  {userResult, score};

  };


  public async getAllCategories()  {
    return await prisma.postCategory.findMany();
  }
}

