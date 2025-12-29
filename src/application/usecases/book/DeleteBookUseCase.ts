import { UpdateBookDto } from "@/application/dto/bookDtos/UpdateBookDto";
import { IBookRepository } from "@/application/interfaces/IBookRepository";
import { Book } from "@/domain/entities/Book";
import { Result } from "@/env/Result";

export class DeleteBookUseCase{
    constructor(private bookRepository: IBookRepository){}

    async execute(dto: UpdateBookDto): Promise<Result<Book>>{
            const bookResult = await this.bookRepository.findByIsbn(dto.isbn)

            if(bookResult.isFailure){
                return Result.fail("Erro ao encontrar o livro")
            }

            const book = bookResult.getValue();

            if(!book?.isbn){
                return Result.fail("livro não encontrado")
            }

            await this.bookRepository.softDelete(book.isbn)

            return Result.ok<Book>()
        
    }
}