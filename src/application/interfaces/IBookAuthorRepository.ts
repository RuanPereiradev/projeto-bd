import { Result } from "@/env/Result";
import { BookAutor } from "@/domain/entities/BookAutor";

export interface IBookAuthorRepository{
        create(BookAutor:BookAutor): Promise<Result<BookAutor>>;
        findById(id: number): Promise<Result<BookAutor>>;
        findByAuthorId(authorId: number): Promise<Result<BookAutor | null>>
        findAll(): Promise<Result<BookAutor[]>>
        update(author: BookAutor): Promise<Result<BookAutor>>
        softDelete(id: number): Promise<Result<void>>

        findByMainAuthor(mainAuthor: boolean) : Promise<Result<BookAutor>>
}