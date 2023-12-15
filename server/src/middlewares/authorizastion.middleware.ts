import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SharedService } from '../shared/shared.service';
import * as jwt from 'jsonwebtoken';
import { tokenDto } from 'src/dto/token.dto';

@Injectable()
export class AuthorizastionMiddleware implements NestMiddleware {
  constructor(private _sharedService: SharedService) {}
 async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('iam in iddleware');

      const accessToken = req.headers.authorization;

      const verifyAccessToken = this._sharedService.verifyToken(
        accessToken.split(' ')[1],
      );

      if (!verifyAccessToken) {

        const refreshToken = req.headers.refreshtoken as string;
        const verifyRefreshToken =
          this._sharedService.verifyToken(refreshToken);
        if (verifyRefreshToken) {
          const credential: tokenDto = {
            id: (verifyRefreshToken as tokenDto).id,
            userName: (verifyRefreshToken as tokenDto).userName,
          };

          const newAccessToken =await this._sharedService.generateAccessToken(credential);
          res.setHeader('newaccesstoken', newAccessToken);
        } else {
        }
      }
      next();
    } catch (error) {}
  }
}
