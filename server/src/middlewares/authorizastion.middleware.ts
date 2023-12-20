import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AuthorizastionMiddleware implements NestMiddleware {
  constructor(private _sharedService: SharedService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    
    try {
      const accessToken = req.headers.authorization;

      const verifyAccessToken = this._sharedService.verifyToken(
        accessToken.split(' ')[1],
      );

      if (!verifyAccessToken) {
        return res.status(401).json();
      }
      next();
    } catch (error) {
      console.log('Error', error);
    }
  }
}
 