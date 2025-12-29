import { CreateBookDto } from "@/application/dto/bookDtos/CreateBookDto";
import { IAuthorRepository } from "@/application/interfaces/IAuthorRepository";
import { IBookAuthorRepository } from "@/application/interfaces/IBookAuthorRepository";
import { IBookRepository } from "@/application/interfaces/IBookRepository";
import { Book } from "@/domain/entities/Book";
import { BookAutor } from "@/domain/entities/BookAutor";
import { Result } from "@/env/Result";

export class CreateBookUseCase{
    constructor(private bookRepository: IBookRepository,
                private authorRepository: IAuthorRepository,
                private bookAuthorRepository: IBookAuthorRepository
    ){}

    async execute(dto: CreateBookDto): Promise<Result<Book>>{
            const existing = await this.bookRepository.findByIsbn(dto.isbn)
            if(existing.isFailure){
                return Result.fail("Erro ao verificar ISBN")
            }

            if(existing.getValue()){
                return Result.fail("Livro com este ISBN já existe")
            }

            if(dto.authorIds.length === 0){
                return Result.fail("Livro deve existir pelo menos um autor")
            }

            if(!dto.authorIds.includes(dto.mainAuthorId)){
                return Result.fail("Autor principal deve estar na lista de autores");
            }

            for(const authorId of dto.authorIds){
                const exists = await this.authorRepository.exists(authorId)
                if(exists.isFailure || !exists.getValue()){
                    return Result.fail(`Author ${authorId} não existe`);
                }
            }

            const book = new Book(
                dto.isbn,
                dto.title,
                dto.yearLaunch,
                dto.publisher,
                dto.quantExemplares,
                dto.codCategory,
                dto.codSubcategory
            );

            const bookResult = await this.bookRepository.create(book);
            if(bookResult.isFailure){
                return Result.fail("Erro ao criar livro")
            }

            for(const authorId of dto.authorIds){
                const bookAuthor = new BookAutor(
                    0,
                    dto.isbn,
                    authorId,
                    authorId === dto.mainAuthorId
                );

                const relationResult = await this.bookAuthorRepository.create(bookAuthor);
                if(relationResult.isFailure){
                    return Result.fail("Erro ao associar autores ao livro");
                }
            }

            return Result.ok(bookResult.getValue());
       
    }
}