import { Result } from "@/env/Result";
import { Exemplar } from "../../domain/entities/Exemplar";

export interface IExemplarRepository{
    create(exemplar:Exemplar): Promise<Result<Exemplar>>;
    findById(idExemplar: number): Promise<Result<Exemplar| null>>
    findAll(): Promise<Result<Exemplar[]>>
    update(user: Exemplar): Promise<Result<Exemplar>>
    softDelete(idExemplar: number): Promise<Result<void>>

    findByIsbn(isbn: string): Promise<Result<Exemplar>>
    isAvaible(idExemplar: number): Promise<Result<Exemplar>>
    
}