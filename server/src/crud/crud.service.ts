import { Injectable } from '@nestjs/common';
import { bookDataDto } from '../dto/bookData.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../schemas/book.model';

@Injectable()
export class CrudService {
  constructor(@InjectModel(Book) private readonly _bookModel: typeof Book) {}

  async addBook(data: bookDataDto) {
    try {
      await this._bookModel.create({
        name: data.name,
        author: data.author,
        price: data.price,
        bookType: data.bookType,
        language: data.language,
        shortDescription: data.shortDescription,
        coverPhoto: data.coverPhoto,
      });
      return
    } catch (error) {
      console.log('Error', error);
    }
  }
}
