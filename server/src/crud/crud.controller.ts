import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('crud')
export class CrudController {

    @Get('/register')
    
    getUserName(){
        return ['abijith','Fabna','abifa']
    }
    @Post('/register')
    postData(@Req()req){
        console.log(req.body);
        
        return req.body
    }
}
