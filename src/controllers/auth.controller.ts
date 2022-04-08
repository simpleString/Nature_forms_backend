import { Request, Response, Router } from 'express';
import { invalidParams } from '../errors/responseErrors';
import { IUserSignDTO } from '../interfaces';
import authenticateToken from '../middlewares/auth.middleware';
import { AuthService } from '../services';

const router = Router();
const authService = new AuthService();

router.post('/login', async (req: Request, res: Response) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (email && password) {
    try {
      const token = await authService.login({ email, password });
      res.statusCode = 202;
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      });
      return res.end();
    } catch (error) {}
  }
  return invalidParams(res, "Password or username didn't match");
});

router.post('/signup', async (req: Request, res: Response) => {
  const userData = req.body as IUserSignDTO;
  try {
    const result = await authService.signUp(userData);
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return res.json(error);
  }
});

router.get('/statuses', async (req: Request, res: Response) => {
  return res.json(await authService.userStatuses());
})

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.statusCode = 200;
  res.end();
});

router.get('/user',authenticateToken ,  async (req: Request, res: Response) => {
  return res.json(await authService.getUserData(req.userId))
})

router.put('/user', authenticateToken, async (req: Request, res: Response) => {
  const userData = req.body as IUserSignDTO;
  return res.json(await authService.updateUserData(userData, req.userId))
})

router.get('', authenticateToken, async (req: Request, res: Response) => {
  const username = await authService.getUsername(req.userId);
  return res.json({ ...username });
});

export default router;
