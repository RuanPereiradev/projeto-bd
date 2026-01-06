import { Result } from "../../env/Result";
import { auditableEntity } from "../common/auditableEntity";

interface CreateLoanProps{
    userId: number;
    startDate: Date;
    dueDate: Date;
}

export class Loan extends auditableEntity{
    private _idLoan?: number;
    private _idUser: number;
    private _startDate: Date;
    private _expectedReturnDate: Date;
    private _dateDevolution: Date | null ;
    


    constructor(idUser: number, startDate: Date, expectedReturnDate: Date, dateDevolution:Date | null = null, idLoan?: number,){
        super();
        this._idLoan = idLoan;
        this._idUser = idUser;
        this._startDate = startDate;
        this._expectedReturnDate = expectedReturnDate;
        this._dateDevolution = dateDevolution;
    }

    get idLoan(): number | undefined{
        return this._idLoan
    }

    get idUser(): number{
        return this._idUser
    }

    get startDate(): Date{
        return this._startDate
    }

    get expectedReturnDate(): Date{
        return this._expectedReturnDate
    }

    get dateDevolution(): Date | null{
        return this._dateDevolution
    }

    softDelete(){
        this._deletedAt = new Date()
    }

    static create(props: CreateLoanProps): Result<Loan>{

        const {userId, startDate, dueDate} = props;

        if(!userId){
            return Result.fail("Usuário inválido para empréstimo");
        }

        if(!startDate || !dueDate){
            return Result.fail("Datas do empréstimo  são obrigatorias")
        }

        if(dueDate <= startDate){
            return Result.fail("Data de devolução deve ser maior que a data de inicio")
        }

        const loan = new Loan(
            userId,
            startDate,
            dueDate,
        );

        return Result.ok(loan)
        
    }

    markAsReturne(returnDate: Date): Result<void>{
        if(this._dateDevolution){
            return Result.fail("Emprestimo já foi finalizado")
        }

        if(returnDate < this._startDate){
            return Result.fail("Data de devolução inválida")
        }

        this._dateDevolution = returnDate;
        return Result.ok()
    }

}