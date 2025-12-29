import { Result } from "@/env/Result";
import { Loan } from "../../domain/entities/Loan";

export interface ILoanRepository{
    create(loan:Loan): Promise<Result<Loan>>;
    findById(idLoan: number): Promise<Result<Loan| null>>
    findAll(): Promise<Result<Loan[]>>
    update(loan: Loan): Promise<Result<Loan>>
    softDelete(id: number): Promise<Result<void>>

    listByUserId(userId: number): Promise<Result<Loan[]>>
    listActiveLoan(idLoan: number): Promise<Result<Loan[]>>
    
    findByStartDate(startDate: Date): Promise<Result<Loan>>
    countActiveLoanByUser(userId: number): Promise<Result<number>>
    
}