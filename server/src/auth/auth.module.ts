import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../schemas/user.model';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports:[SequelizeModule.forFeature([User]),
SharedModule],
  controllers:[AuthController],
  providers: [AuthService]
})
export class AuthModule {}
