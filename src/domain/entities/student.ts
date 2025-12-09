import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";
import { resolve } from "path";

export class student extends auditableEntity{
    private _id: string;
    private _mat: string;
    private _codCourse: number;
    private _dataIngresso: Date;
    private _dataConclusaoPrevista: Date;

    constructor(mat: string, codCourse: number, dataIngresso: Date, dataConclusaoPrevista: Date, id?: string){
        super();
        this._id = id ?? crypto.randomUUID();
        this._mat = mat;
        this._codCourse = codCourse;
        this._dataIngresso = dataIngresso;
        this._dataConclusaoPrevista= dataConclusaoPrevista;
    }

    get id(): string{
        return this._id;
    }

    get mat(): string{
        return this._mat;
    }

    get codCourse(): number{
        return this._codCourse;
    }

    get dataIngresso(): Date{
        return this._dataIngresso;
    }

    get dataConclusaoPrevista(): Date{
        return this._dataConclusaoPrevista
    } 

    softDelete(){
        this._deletedAt = new Date();
    }

    changeMat(newMat: string): Result<void>{
        if(!newMat){
            return Result.fail("Matricula não pode ser nulo")
        }
        this._mat = newMat;
        return Result.ok()
    }

    changeCodCourse(newCode: number): Result<void>{
         if(!newCode){
            return Result.fail("Matricula não pode ser nulo")
        }
        this._codCourse = newCode;
        return Result.ok()
    } 
    changeDataIngresso(newDateIn: Date): Result<void>{
         if(!newDateIn){
            return Result.fail("Matricula não pode ser nulo")
        }
        this._dataIngresso = newDateIn;
        return Result.ok()
    } 
    changeDataConcPrev(newDateConcPrev: Date): Result<void>{
         if(!newDateConcPrev){
            return Result.fail("Matricula não pode ser nulo")
        }
        this._dataConclusaoPrevista = newDateConcPrev;
        return Result.ok()
    } 

}