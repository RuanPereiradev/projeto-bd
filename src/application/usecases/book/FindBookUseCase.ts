import { FindBookDto } from "@/application/dto/bookDtos/FindBookDto";
import { IBookRepository } from "@/application/interfaces/IBookRepository";
import { Book } from "@/domain/entities/Book";
import { Result } from "@/env/Result";

export class FindBookUseCase{
    constructor(private bookRepository: IBookRepository){}

    async execute(dto: FindBookDto): Promise<Result<Book>>{
            const book = await this.bookRepository.findByIsbn(dto.isbn)

            if(!book){
                return Result.fail("Livro não encontrado")
            }

            return Result.ok<Book>(book.getValue());
    }
}