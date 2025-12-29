import { Result } from "@/env/Result";
import { Loan } from "../../domain/entities/Loan";
import { LoanItem } from "../../domain/entities/LoanItem";

export interface ILoanItemRepository{
    create(loanItem:LoanItem): Promise<Result<LoanItem>>;
    findById(idLoanItem: number): Promise<Result<LoanItem| null>>
    findAll(): Promise<Result<LoanItem[]>>
    update(loanILoanItem: LoanItem): Promise<Result<LoanItem>>
    softDelete(id: number): Promise<Result<void>>

    findByStartDate(startDate: Date): Promise<Result<LoanItem[]>>
    findByIdExemplar(idExemplar: number) : Promise<Result<LoanItem>>
}