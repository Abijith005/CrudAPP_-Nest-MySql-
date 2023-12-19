import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './schemas/user.model';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AuthorizastionMiddleware } from './middlewares/authorizastion.middleware';
import { MulterFileUploadModule } from './multer-file-upload/multer-file-upload.module';
import { Book } from './schemas/book.model';


@Module({
  imports: [CrudModule,
    SharedModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'abijith',
      password: 'abijiths@005',
      database: 'crud',
      models: [User,Book],
    }),
  ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
  MulterFileUploadModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizastionMiddleware).exclude(
      {path:'/auth/(.*)',method:RequestMethod.ALL},
    ).forRoutes('*')
  }
}
