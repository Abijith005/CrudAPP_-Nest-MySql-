import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller()
export class CrudController {

    @Get('/hello')
    
    getUserName(){
        return ['abijith','Fabna','abifa']
    }
    @Post()
    postData(@Req()req){
        console.log(req.body);
        
        return req.body
    }
}
