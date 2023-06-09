import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { bcryptSaltOrRounds } from './constants';
import { HttpStatus, Logger } from '@nestjs/common';

const logger = new Logger('Helper');
export const jwtHelper = {
  sign(data: { name: string; isAdmin: boolean }) {
    return jwt.sign(data, 'ea6f2e11ea6f2e');
  },

  verify(data: string) {
    try {
      return jwt.verify(data, 'ea6f2e11ea6f2e');
    } catch (err) {
      return new Error(err);
    }
  },
};

export const bcryptHelper = {
  async hash(passwd: string): Promise<string> {
    return await bcrypt.hash(passwd, bcryptSaltOrRounds);
  },

  async isMatch(hashedPasswd: string, passwd: string): Promise<boolean> {
    return await bcrypt.compare(passwd, hashedPasswd);
  },
};

export function getStatusCode(err) {
  logErrorIfNotHttpError(err);

  return err.code > 511 ? HttpStatus.INTERNAL_SERVER_ERROR : err.code;
}

export function logErrorIfNotHttpError(err) {
  if (err.code > 511) {
    logger.error(`[${err}]`);
  }
}
