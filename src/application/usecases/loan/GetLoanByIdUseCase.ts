import { GetLoanDto } from "@/application/dto/loanDtos/GetLoanDto";
import { ILoanRepository } from "@/application/interfaces/ILoanRepository";
import { Loan } from "@/domain/entities/Loan";
import { Result } from "@/env/Result";

export class GetLoanByIdUseCase{
    constructor(private loanRepository: ILoanRepository){}

    async execute(dto: GetLoanDto): Promise<Result<Loan>>{
            const loanResult = await this.loanRepository.findById(dto.idLoan)

            if(loanResult.isFailure){
                return Result.fail("Erro ao buscar emprestimo por id")
            }

            const loan = loanResult.getValue();

            if(!loan){
                return Result.fail("Emprestimo não encontrado");
            }

            return Result.ok<Loan>(loan)
    }
}