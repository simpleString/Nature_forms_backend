import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['token'];
  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_KEY as string,
    (err: any, userData: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.userId = userData.userId;

      next();
    }
  );
}

export default authenticateToken;
