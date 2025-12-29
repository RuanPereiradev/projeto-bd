import { ReturnLoanDto } from "@/application/dto/loanDtos/ReturnLoanDto";
import { ILoanRepository } from "@/application/interfaces/ILoanRepository";
import { Loan } from "@/domain/entities/Loan";
import { Result } from "@/env/Result";

export class ReturnLoanUseCase{
    constructor(private loanRepository: ILoanRepository){}

    async execute(dto: ReturnLoanDto): Promise<Result<Loan>>{
            const loanResult = await this.loanRepository.findById(dto.idLoan)
            if(loanResult.isFailure){
                return Result.fail("Falha ao buscar emprestimo")
            }

            const loan = loanResult.getValue();

            if(!loan){
                return Result.fail("Emprestimo não encontrado");
            }

            const result = loan.markAsReturne(dto.returnDate);
            if(result.isFailure){
                return Result.fail(result.getError())
            }

            await this.loanRepository.create(loan)
            return Result.ok()
    }
}