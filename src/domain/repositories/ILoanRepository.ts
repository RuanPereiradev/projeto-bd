import { Result } from "@/env/Result";
import { Loan } from "../entities/Loan";

export interface ILoanRepository{
    create(loan:Loan): Promise<Result<Loan>>;
    findById(idLoan: number): Promise<Result<Loan| null>>
    findAll(): Promise<Result<Loan[]>>
    update(loan: Loan): Promise<Result<Loan>>
    softDelete(id: number): Promise<Result<void>>

    findByStartDate(startDate: Date): Promise<Result<Loan>>
}