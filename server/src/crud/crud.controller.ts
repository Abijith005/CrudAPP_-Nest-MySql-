import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller('crud')
export class CrudController {

    @Get()
    
    getUserName(){
        return ['abijith','Fabna','abifa']
    }
}
