import { Response } from 'express';

export const invalidParams = (res: Response, msg = 'InvalidParams.') => {
  res.statusCode = 400;
  res.json({ data: msg });
};

export const notFound = (res: Response, msg = 'Not found.') => {
  res.statusCode = 404;
  res.json({ data: msg });
};
