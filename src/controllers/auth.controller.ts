import { Request, Response, Router } from 'express';
import { invalidParams } from '../errors/responseErrors';
import { IUserSignDTO } from '../interfaces';
import authenticateToken from '../middlewares/auth.middleware';
import { AuthService } from '../services';

const router = Router();
const authService = new AuthService();

router.post('/login', async (req: Request, res: Response) => {
  const username = req.body?.username;
  const password = req.body?.password;

  if (username && password) {
    try {
      const token = await authService.login({ username, password });
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
    res.statusCode = 500;
    return res.json(error);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.statusCode = 200;
  res.end();
});

router.get('', authenticateToken, async (req: Request, res: Response) => {
  const username = await authService.getUsername(req.userId);
  return res.json({ ...username });
});

export default router;
