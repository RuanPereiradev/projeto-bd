import { Result } from "../../env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class Student extends auditableEntity{
    private _userId: number;
    private _registration: string;
    private _codCourse: number;
    private _dateEntry: Date;
    private _expectedCompletionDate: Date;

    constructor(userId: number,registration: string, codCourse: number, dateEntry: Date, expectedCompletionDate: Date){
        super();
        if(userId === null || userId === undefined ){
            throw new Error("UserId obrigatório")
        }
        if(!registration.trim() ){
            throw new Error("registration obrigatório")
        }
        if(codCourse === null || codCourse === undefined ){
            throw new Error("codCourse obrigatório")
        }
        if(!dateEntry){
            throw new Error("dateEntry obrigatório")
        }
        if(!expectedCompletionDate){
            throw new Error("expectedCompletionDate obrigatório")
        }
        this._userId = userId
        this._registration = registration;
        this._codCourse = codCourse;
        this._dateEntry = dateEntry;
        this._expectedCompletionDate = expectedCompletionDate;
    }

    get userId(): number { 
        return this._userId 
    } 

    get registration(): string{
        return this._registration;
    }

    get codCourse(): number{
        return this._codCourse;
    }

    get dateEntry(): Date{
        return this._dateEntry;
    }

    get expectedCompletionDate(): Date{
        return this._expectedCompletionDate
    } 

    softDelete(){
        this._deletedAt = new Date();
    }

    changeRegistration(newRegistration: string): Result<void>{
        if(!newRegistration?.trim()){
            return Result.fail("Registration not null")
        }
        this._registration = newRegistration;
        return Result.ok()
    }

    changeCodCourse(newCode: number): Result<void>{
         if(newCode === null || newCode === undefined){
            return Result.fail("Matricula não pode ser nulo")
        }
        this._codCourse = newCode;
        return Result.ok()
    } 

    changeDateEntry(newDateEntry: Date): Result<void>{
         if(!newDateEntry){
            return Result.fail("date entry not null")
        }
        this._dateEntry = newDateEntry;
        return Result.ok()
    } 

    changeCompletionDate(NewCompletionDate: Date): Result<void>{
         if(!NewCompletionDate){
            return Result.fail("completion date is not null")
        }
        this._expectedCompletionDate = NewCompletionDate;
        return Result.ok()
    } 

}