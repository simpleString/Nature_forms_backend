import { Request, Response, Router } from 'express';
import { invalidParams, notFound } from '../errors/responseErrors';
import { ITestAnswerDTO, ITestFormDTO } from '../interfaces';

import { PostService, TestService } from '../services';

const router = Router();
const postService = new PostService();
const testService = new TestService();

router.get('/result', async (req: Request, res: Response) => {
  const posts = await postService.getAllPostsWithUserResult(req.userId);
  res.json(posts);
});

router.get('/:id', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const post = await postService.getPostById(id);

    if (post) return res.json({ ...post });
    return notFound(res);
  }
  invalidParams(res);
});

router.get('/:id/tests/result', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const result = await testService.getUserResult(req.userId, id);

    if (result) return res.json(result);
    notFound(res);
  }
  invalidParams(res);
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

router.post('/:id/tests', async (req: Request, res: Response) => {
  const answers = req.body as ITestAnswerDTO[];
  const result = await testService.recordUserResult(req.userId, answers);
  res.json(result);
});

router.post('', async (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.content;
  const categoryId = req.body.categoryId;
  const tests = req.body.tests as ITestFormDTO[];
  const post = await postService.createPost({ title, content, categoryId });
  const result = await testService.createTestsForPost(post, tests);
  res.json(result);
});

export default router;
