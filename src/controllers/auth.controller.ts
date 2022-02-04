import { Request, Response, Router } from 'express';
import { invalidParams } from '../errors/responseErrors';
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
      res.cookie('token', token, { httpOnly: true, maxAge: 900000 });
      console.log(token);
      return res.end();
    } catch (error) {}
  }
  return invalidParams(res, "Password or username did't match");
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
