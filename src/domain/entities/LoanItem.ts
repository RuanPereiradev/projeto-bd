import { auditableEntity } from "../common/auditableEntity";

export class LoanItem extends auditableEntity{
    private _idItem: number;
    private _idLoan: number;
    private _idExemplar: number;
    private _returnedDate: Date;
    private _fine: number;

    constructor(idItem: number, idLoan: number, idExemplar: number, returnedDate:Date, fine: number){
        super();
        this._idItem = idItem;
        this._idLoan = idLoan;
        this._idExemplar = idExemplar;
        this._returnedDate = returnedDate;
        this._fine = fine;
    }

    get idItem(): number{
        return this._idItem;
    }
    get idLoan(): number{
        return this._idLoan;
    }
    get idExemplar(): number{
        return this._idExemplar;
    }
    get returnedDate(): Date{
        return this._returnedDate;
    }
    get fine(): number{
        return this._fine;
    }
   
    softDelete(){
        this._deletedAt = new Date();
    }
    

}