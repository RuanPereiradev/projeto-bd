import { Result } from "@/env/Result";
import { Author } from "@/domain/entities/Author";

export interface IAuthorRepository{
    create(author:Author): Promise<Result<Author>>;
    findById(authorId: number): Promise<Result<Author | null>>
    findAll(): Promise<Result<Author[]>>
    update(author: Author): Promise<Result<Author>>
    softDelete(id: number): Promise<Result<void>>

    findByEmail(string: string): Promise<Result<Author | null>>;
    findByName(name: string): Promise<Result<Author[]>>;
    exists(authorId: number): Promise<Result<boolean>>;

    findBookIdsByAuthor(authorId: number): Promise<Result<number[]>>
}