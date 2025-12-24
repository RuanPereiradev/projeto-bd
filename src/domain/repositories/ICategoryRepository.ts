import { Result } from "@/env/Result";
import { Employee } from "../entities/Employee";
import { Category } from "../entities/Category";

export interface ICategoryRepository{
    create(category: Category): Promise<Result<Category>>;
    findCodCategory(codCategory: number): Promise<Result<Category | null>>
    findAll(): Promise<Result<Category[]>>
    update(category: Category): Promise<Result<Category>>
    softDelete(codCategory: number): Promise<Result<void>>
}