import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";
import { fail } from "assert";

export class Reserva extends auditableEntity{
    private _idUser: number;
    private _idReservation: number
    private _isbn: string;
    private _reservationDate: Date;

    constructor(idUser: number,idReservation: number, isbn: string, reservationDate: Date){
        super();
        if(!isbn){
            throw new Error("Isbn obrigatória")
        }
        if(reservationDate === null || reservationDate === undefined){
            throw new Error("reservationDate obrigatória")

        }
        this._idUser = idUser
        this._idReservation = idReservation;
        this._isbn = isbn
        this._reservationDate = reservationDate
    }

    get idUser(): number{
        return this._idUser;
    }
    
    get idReservation(): number{
        return this._idReservation;
    }

    get isbn(): string{
        return this._isbn;
    }

    get reservationDate(): Date{
        return this._reservationDate;
    }
   
    softDelete(){
        return this._deletedAt = new Date()
    }

    changeIsbn(newIsbn: string): Result<void>{
        if(!newIsbn){
            return Result.fail("isbn obrigatorio")
        }
        this._isbn = newIsbn; 
        return Result.ok()
    }
}