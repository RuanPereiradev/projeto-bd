import { Result } from "@/env/Result";
import { Employee } from "../../domain/entities/Employee";
import { Category } from "../../domain/entities/Category";

export interface ICategoryRepository{
    create(category: Category): Promise<Result<Category>>;
    findCodCategory(codCategory: number): Promise<Result<Category | null>>
    findAll(): Promise<Result<Category[]>>
    update(category: Category): Promise<Result<Category>>
    softDelete(codCategory: number): Promise<Result<void>>
}