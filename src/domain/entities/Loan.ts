import { auditableEntity } from "../common/auditableEntity";

export class Loan extends auditableEntity{
    private _idLoan: number;
    private _idUser: number;
    private _startDate: Date;
    private _expectedReturnDate: Date;
    private _dateDevolution: Date | null;
    


    constructor(idLoan: number, idUser: number, startDate: Date, expectedReturnDate: Date, dateDevolution:Date){
        super();
        this._idLoan = idLoan;
        this._idUser = idUser;
        this._startDate = startDate;
        this._expectedReturnDate = expectedReturnDate;
        this._dateDevolution = dateDevolution ?? null;
    }

    get idLoan(): number{
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
}