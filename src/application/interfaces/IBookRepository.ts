import { Result } from "@/env/Result";
import { Book } from "../../domain/entities/Book";

export interface IBookRepository{
    create(book:Book): Promise<Result<Book>>;
    findById(id: number): Promise<Result<Book| null>>
    findAll(): Promise<Result<Book[]>>
    update(book: Book): Promise<Result<Book>>
    softDelete(id: string): Promise<Result<void>>

    findByTitle(title: string): Promise<Result<Book[]>>
    findByCodCategory(codCategory: number): Promise<Result<Book[]>>
    findByCodSubCategory(codSubCategory: number): Promise<Result<Book[]>>
    findByIsbn(isbn: string): Promise<Result<Book>>
    findByPublisher(publisher: string): Promise<Result<Book[]>>
}