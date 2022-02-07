import { Request, Response, Router } from 'express';
import { invalidParams, notFound } from '../errors/responseErrors';
import { ITestAnswerDTO, ITestFormDTO } from '../interfaces';

import { PostService, TestService } from '../services';

const router = Router();
const postService = new PostService();
const testService = new TestService();

router.get('/file', async (req: Request, res: Response) => {
  res.sendFile('/home/dmitry/Projects/kristina_diplom/backend/posts/second.md');
});

router.get('/:id', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const post = await postService.getPostById(id);
    console.log(post);

    if (post) return res.json({ ...post });
    return notFound(res);
  }
  invalidParams(res);
});

router.get('', async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  console.log(posts);
  res.json(posts);
});

router.get('/:id/tests/result', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const result = await testService.getUserResult(req.userId, id);
    console.log(result);

    if (result) return res.json(result);
    notFound(res);
  }
  invalidParams(res);
});

router.get('/:id/tests', async (req: Request, res: Response) => {
  let id = Number.parseInt(req.params.id);
  if (!isNaN(id)) {
    const tests = await testService.getTestForPost(id);
    console.log(tests);

    if (tests) return res.json(tests);
    notFound(res);
  }
  invalidParams(res);
});

router.post('/:id/tests', async (req: Request, res: Response) => {
  console.log(req.body);

  const answers = req.body as ITestAnswerDTO[];
  const result = await testService.recordUserResult(req.userId, answers);
  res.json(result);
});

router.post('', async (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.content;
  const tests = req.body.tests as ITestFormDTO[];
  console.log(tests);
  const post = await postService.createPost({ title, content });
  const result = await testService.createTestsForPost(post, tests);
  console.log(result);
  res.json(result);
});

export default router;
