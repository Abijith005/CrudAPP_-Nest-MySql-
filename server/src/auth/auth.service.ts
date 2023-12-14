import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { apiResponseDto } from '../dto/apiResponse.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../schemas/user.model';
import * as bcrypt from 'bcrypt';
import { SharedService } from '../shared/shared.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly _userModel: typeof User,
    private _shareService: SharedService,
  ) {}
  async registerNewUser(data: UserDto): Promise<apiResponseDto> {
    try {
      const user = await this._userModel.findOne({
        where: { email: data.email },
      });
      if (!user) {
        const password =await bcrypt.hash(data.password, 10);
        
        await this._userModel.create({
          name: data.name,
          email: data.email,
          password: password,
          blockStatus:false
        });
        return { success: true, message: 'User registration successful' };
      } else {
        return { success: false, message: 'User already exists' };
      }
    } catch (error) {
      console.error('Error', error);

      throw new Error('Registration failed');
    }
  }

  async userLogin(data: UserDto) {
    try {
      const user = await this._userModel.findOne({
        where: { email: data.email },
      });
      if (user) {
        const password = await bcrypt.compare(data.password,user.password);
        console.log(password,'checkingggggggggggggggggggg');
        
        if (password) {
          const token = await this._shareService.generateToken({id:user.id,userName:user.email});

          return { success: true, message: 'Login successfull', token: token };
        } else {
          return { success: false, message: 'Wrong password' };
        }
      } else {
        return { success: false, message: 'Invalid user' };
      }
    } catch (error) {
      console.error('Error', error);

      throw new Error(error);
    }
  }
}
