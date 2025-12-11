import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";
import { RegimeType } from "../enums/RegimeType";

export class Teacher extends auditableEntity{
    private _userId: number;
    private _matSiape: string;
    private _address: string;
    private _workRegime: RegimeType;
    private _courseCode: number;
    private _hireDate: Date;

    constructor( userId: number, matSiape: string, address: string, workRegime: RegimeType, courseCode: number, hireDate: Date){
        super();
        if(!matSiape.trim()) throw new Error("SIAP inválido")
        if(!Object.values(RegimeType).includes(workRegime)){
            throw new Error("Regime de trabalho inválido")
        }
        if(courseCode === undefined || courseCode === null){
            throw new Error("codigo do curso é inválido")
        }
        if(!hireDate){
            throw new Error("data de contratação não pode ser nula")
        }
        this._userId = userId,
        this._matSiape = matSiape, 
        this._address = address,
        this._workRegime = workRegime
        this._courseCode = courseCode;
        this._hireDate = hireDate;
    }

    get userId(): number{
        return this._userId;
    }

    get matSiape(): string{
        return this._matSiape;
    }

    get address(): string{
        return this._address;
    }

    get workRegime(): RegimeType{
        return this._workRegime;
    }

    get courseCode(): number{
        return this._courseCode;
    }

    get hireDate(): Date{
        return this._hireDate;
    }

    softDelete(){
        this._deletedAt = new Date();
    }

    changeWorkRegime(newRegime: RegimeType): Result<void>{
        if(!newRegime){
            return Result.fail("Regime Inválido")
        }
        this._workRegime = newRegime;
        return Result.ok() 
    }

}