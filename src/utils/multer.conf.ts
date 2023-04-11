import * as multer from 'multer';
import * as process from 'process';
import { join } from 'path';
import express from 'express';

export const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, join(process.cwd(), 'public'));
  },

  filename(
    req: express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    const filename =
      Date.now() +
      req.body.title?.replace(/\s/g, '') +
      '.' +
      file.mimetype.split('/')[1];

    callback(null, filename);
  },
});
