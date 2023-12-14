import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.model';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private readonly _userModel:typeof User){}
    async registerNewUser(data:UserDto):Promise<User>{
        try {
            console.log(data.name);
            
           return await this._userModel.create({name:data.name,email:data.email,password:data.password})
        } catch (error) {
            console.log('error',error);
            
        }
    }
}
