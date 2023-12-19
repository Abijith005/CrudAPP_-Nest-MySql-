import { Module } from '@nestjs/common';
import { MulterFileUploadService } from './multer-file-upload.service';
import { MulterFileUploadController } from './multer-file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[
MulterModule.registerAsync({
  useFactory: () => ({
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        const filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
        cb(null, filename);
      },
    }),
  }),
})
  ],
  providers: [MulterFileUploadService],
  controllers: [MulterFileUploadController]
})
export class MulterFileUploadModule {}
