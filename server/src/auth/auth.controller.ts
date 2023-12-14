import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {

constructor(private _authService:AuthService){}
   @Post('/register')
    registerUser(@Body()data:UserDto){
        console.log('entered register',data);
        
        this._authService.registerNewUser(data)
    }
}
