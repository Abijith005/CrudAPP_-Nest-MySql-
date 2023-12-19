import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CrudService } from './crud.service';
import { bookDataDto } from '../dto/bookData.dto';
import { error } from 'console';

@Controller('crud')
export class CrudController {
  constructor(private _crudService: CrudService) {}

  @Post('/addBook')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: bookDataDto,
    @Res() res: Response,
  ) {
    try {
      data.coverPhoto = file.path;
      await this._crudService.addBook(data);
      res
        .status(200)
        .json({ success: true, message: 'Book added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  }
  @Get('/hello')
  sample(@Res()res:Response){
    console.log('api callll');
    
res.json({response:'done'})
  }
}
