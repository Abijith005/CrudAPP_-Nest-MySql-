import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post('/register')
  async registerUser(
    @Body() data: UserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await this._authService.registerNewUser(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  }


  @Post('/login')

  async userLogin(@Body()data:UserDto, @Res()res:Response){
    try {
        const result=await this._authService.userLogin(data)
        if(result.token){
            res.setHeader('Authorization',`Bearer ${result.token}`)
            delete result.token
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({success:false,message:'Internal server error'})
    }
  }
}
