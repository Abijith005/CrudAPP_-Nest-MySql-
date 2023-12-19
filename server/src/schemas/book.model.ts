import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Book extends Model {
  @Column
  name: string;

  @Column
  author: string;

  @Column
  price:number

  @Column
  bookType: string;

  @Column
  language:string

  @Column
  shortDescription:string

  @Column
  coverPhoto:string

}
