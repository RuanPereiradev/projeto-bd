import { UpdateBookDto } from "@/application/dto/bookDtos/UpdateBookDto";
import { IAuthorRepository } from "@/application/interfaces/IAuthorRepository";
import { IBookRepository } from "@/application/interfaces/IBookRepository";
import { Book } from "@/domain/entities/Book";
import { Result } from "@/env/Result";

export  class UpdateBookUseCase{
    constructor(private bookRepository: IBookRepository,
                private authorRepository: IAuthorRepository
    ){}

    async execute(dto: UpdateBookDto): Promise<Result<Book>>{
            const existing = await this.bookRepository.findByIsbn(dto.isbn)
            if(existing.isFailure){
                return Result.fail("erro ao verificar ISBN")
            }
        
            const existingBook = existing.getValue();

            if(!existingBook){
                return Result.fail("Book not found")
            }

            if(dto.isbn){
                return Result.fail("Você não pode editar o isbn")
            }

            if(dto.title){
                const titleResult = existingBook.changeTitle(dto.title)
                if(titleResult.isFailure){
                    return Result.fail(titleResult.getError());
                } 
            }

            if(dto.yearLaunch){
                const yearLaunchResult = existingBook.changeYearLaunch(dto.yearLaunch)
                if(yearLaunchResult.isFailure){
                    return Result.fail(yearLaunchResult.getError());
                }
            }
            if(dto.publisher){
                const publisherResult = existingBook.changePublisher(dto.publisher)
                if(publisherResult.isFailure){
                    return Result.fail(publisherResult.getError());
                }
            }

            if(dto.codCategory){
                const codCategoryResult = existingBook.changeCodCategory(dto.codCategory)
                if(codCategoryResult.isFailure){
                    return Result.fail(codCategoryResult.getError())
                }
            }

            if(dto.codCategory){
                const codCategoryResult = existingBook.changeCodCategory(dto.codCategory)
                if(codCategoryResult.isFailure){
                    return Result.fail(codCategoryResult.getError())
                }
            } 
            
            const result = await this.bookRepository.update(existingBook) 
            return result    
    }
}