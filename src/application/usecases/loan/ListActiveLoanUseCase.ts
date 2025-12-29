import { ListLoanByUserDto } from "@/application/dto/loanDtos/ListLoanByUserDto";
import { ILoanRepository } from "@/application/interfaces/ILoanRepository";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { Loan } from "@/domain/entities/Loan";
import { Result } from "@/env/Result";

export class ListActiveLoanUseCase{
    constructor(private loanRepository: ILoanRepository,
                private userRepository: IUserRepository
    ){}

    async execute(dto: ListLoanByUserDto): Promise<Result<Loan[]>>{
            const userResult = await this.userRepository.findById(dto.userId)
            if(userResult.isFailure || !userResult.getValue()){
                return Result.fail("Erro ao buscar user ou user not found")
            }
        
            const loanResult = await this.loanRepository.listActiveLoan(dto.userId)
            if(loanResult.isFailure || loanResult.getValue()){
                return Result.fail("Erro ao buscar emprestimos")
            }

            return Result.ok(loanResult.getValue())
    }
}