import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class SharedService {
    private readonly secretKey = process.env.JWT_SECRET_KEY;
    async generateToken(credential:{id:number,userName:string}) {
                
      return jwt.sign(credential, this.secretKey, { expiresIn:'1d'});
    }
  
     verifyToken(token: string) {
      const verify = jwt.verify(token, this.secretKey);
  
      return verify;
    }
}
