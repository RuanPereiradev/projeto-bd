import { UpdateBookDto } from "@/application/dto/bookDtos/UpdateBookDto";
import { CreateLoanDto } from "@/application/dto/loanDtos/CreateLoanDto";
import { IBookRepository } from "@/application/interfaces/IBookRepository";
import { IExemplarRepository } from "@/application/interfaces/IExemplarRepository";
import { ILoanItemRepository } from "@/application/interfaces/ILoanItemRepository";
import { ILoanRepository } from "@/application/interfaces/ILoanRepository";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { Book } from "@/domain/entities/Book";
import { Loan } from "@/domain/entities/Loan";
import { userType } from "@/domain/enums/userType";
import { Result } from "@/env/Result";
import { start } from "repl";

export class CreateLoanUseCase{
    constructor(private userRepository : IUserRepository,
                private loanRepository: ILoanRepository,
                private exemplarRepository: IExemplarRepository,
                private loanItemRepository: ILoanItemRepository){}

    async execute(dto: CreateLoanDto): Promise<Result<Loan>>{
            const userResult = await this.userRepository.findById(dto.userId)
            if(userResult.isFailure){
                return Result.fail("Erro ao buscar usuário")
            }

            const user = userResult.getValue();

            if(!user || !user.isActive){
                return Result.fail("Usuário inválido ou inativo")
            }
            
            const policy = user.getLoanPolicy();
            const maxBooks = policy.maxBooks();
            const maxDays = policy.maxDays();

            const activeLoansResult = await this.loanRepository.countActiveLoanByUser(user.userId!);
                if(activeLoansResult.isFailure){
                    return Result.fail("Erro ao verificar empréstimos ativos")
                }

            const activeLoans = activeLoansResult.getValue();

            if(activeLoans >= policy.maxBooks()){
                return Result.fail("Limite de emprestimos antingidos");
            }

            //verificação deo limite
            if(activeLoans + dto.exemplarIds.length > maxBooks){
                return Result.fail("Limite de livros excedido")
            }


            //verificação de exemplares
            for(const exemplarId of dto.exemplarIds){
                const available = await this.exemplarRepository.isAvaible(exemplarId);
                if(!available){
                    return Result.fail(`Exemplar ${exemplarId} não está disponivel`)
                }
            }
            
            //criação de emprestimo
            const today = new Date ();
            const dueDate = new Date();
            dueDate.setDate(today.getDate() + maxDays);

            const loan = Loan.create({
                userId: user.userId!,
                startDate: today,
                dueDate:dueDate
            })

            if(loan.isFailure){
                return Result.fail(loan.getError())
            }

            const loanValue = loan.getValue();

            await this.loanRepository.create(loanValue)

            return Result.ok(loanValue)
    }
}