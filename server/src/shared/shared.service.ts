import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { tokenDto } from 'src/dto/token.dto';
@Injectable()
export class SharedService {
  private readonly secretKey = process.env.JWT_SECRET_KEY;
  async generateRefreshToken(credential: tokenDto) {
    try {
      const token = jwt.sign(credential, this.secretKey, { expiresIn: '2m' });
      return token;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error);
    }
  }

  async generateAccessToken(credential: tokenDto) {
    try {
      const token = jwt.sign(credential, this.secretKey, { expiresIn: '1m' });

      return token;
    } catch (error) {
      console.log('Error', error);
      throw new Error(error);
    }
  }

  verifyToken(token: string) {
    try {
      const verify = jwt.verify(token, this.secretKey);
      return verify;
    } catch (error) {
      console.log('Error', error);
    }
  }
}
