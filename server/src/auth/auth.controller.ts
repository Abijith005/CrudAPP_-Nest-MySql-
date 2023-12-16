import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { Request, Response } from 'express';
import { SharedService } from '../shared/shared.service';
import { tokenDto } from '../dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _sharedService: SharedService,
  ) {}
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
  async userLogin(@Body() data: UserDto, @Res() res: Response) {
    try {
      const result = await this._authService.userLogin(data);

      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get('/getNewAccessToken')
  async getAccessToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.headers.refreshtoken as string;
    const verifyRefreshToken = this._sharedService.verifyToken(refreshToken);
    if (verifyRefreshToken) {
      const credential: tokenDto = {
        id: (verifyRefreshToken as tokenDto).id,
        userName: (verifyRefreshToken as tokenDto).userName,
      };

      const newAccessToken =
        await this._sharedService.generateAccessToken(credential);

      res.status(200).json({
        success: true,
        message: 'New access token generated',
        accessToken: newAccessToken,
      });
    } else {
      res.status(401).json({ success: false, message: 'Token expired' });
    }
  }
}
