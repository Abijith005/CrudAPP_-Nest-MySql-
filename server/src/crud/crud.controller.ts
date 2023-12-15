import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('crud')
export class CrudController {

    @Get('/hello')
    
    getUserName(@Res()res:Response){
        
        res.status(200).json({success:true})
    }
    @Post('/register')
    postData(@Req()req){

        return req.body
    }
}
