import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [CrudModule,
  TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'abijith',
    password:'abijiths@005',
    database:'crud',
    autoLoadEntities:true,
    synchronize:true
  
  
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
