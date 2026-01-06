import { Result } from "../../env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class Exemplar extends auditableEntity{
    private _idExemplar: number;
    private _isbn: string;
    private _sequentialNumber: number;

    constructor(idExemplar: number, isbn: string, sequentialNumber: number){
        super();
        this._idExemplar = idExemplar;
        this._isbn = isbn;
        this._sequentialNumber = sequentialNumber;
    }

    get idExemplar(): number{
        return this._idExemplar;
    }

    get isbn(): string{
        return this._isbn
    }

    get sequentialNumber(): number{
        return this._sequentialNumber
    }

    softDelete(){
        this._deletedAt = new Date()
    }

    changeIsbn(newIsbn: string): Result<void>{
        if(!newIsbn){
            return Result.fail("isbn não pode ser nulo")
        }
        this._isbn = newIsbn
        return Result.ok()
    }
}