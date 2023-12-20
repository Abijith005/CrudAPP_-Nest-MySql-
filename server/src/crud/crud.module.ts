import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from '../schemas/book.model';

@Module({
  imports:[MulterModule.register({
    storage:diskStorage({
      destination:'./uploads',
      filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        const filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
        cb(null, filename);
      }
    })
  }),
SequelizeModule.forFeature([Book])],
  controllers: [CrudController],
  providers: [CrudService]
})
export class CrudModule {}
