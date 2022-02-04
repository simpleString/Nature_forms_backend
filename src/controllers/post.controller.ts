import { Request, Response, Router } from 'express';
import { invalidParams, notFound } from '../errors/responseErrors';

import { PostService, TestService } from '../services';

const router = Router();
const postService = new PostService();
const testService = new TestService();

router.get('/:id', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const post = await postService.getPostById(id);
    console.log(post);

    if (post) return res.json({ post });
    return notFound(res);
  }
  invalidParams(res);
});

router.get('', async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  console.log(posts);
  res.json(posts);
});

router.get('/:id/tests', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const tests = await testService.getTestForPost(id);
    if (tests) return res.json(tests);
    notFound(res);
  }
  invalidParams(res);
});

export default router;
