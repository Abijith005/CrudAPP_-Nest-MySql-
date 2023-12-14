import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AppService {
    private readonly secretKey = process.env.JWT_SECRET_KEY;
    async generateToken(credentials: Number) {
      return jwt.sign(credentials, this.secretKey, { expiresIn: '' });
    }
  
    verifyToken(token: string) {
      const verify = jwt.verify(token, this.secretKey);
  
      return verify;
    }
}
