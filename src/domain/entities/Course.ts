import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class Course extends auditableEntity{
    private _codCourse: number | null;
    private _nameCourse: string;


    constructor(codCourse?: number, nameCourse?: string){
        super();
        if(!nameCourse?.trim()){
        throw new Error("O nome do curso não pode ser vázio")
        }

        this._codCourse = codCourse ?? null;
        this._nameCourse = nameCourse.trim();
    }

    get codCourse(): number | null{
        return this._codCourse
    }

    get nameCourse(): string{
        return this._nameCourse
    }

    get isActive(): boolean{
        return this._isActive
    }

    get deletedAt(): Date | null{
        return this._deletedAt
    }

    softDelete(){
        this._deletedAt = new Date();
    }

    changeName(newName: string): Result<void>{
       if(!newName.trim()){
        return Result.fail("Name não pode ser nulo")
       }
       this._nameCourse = newName.trim();
       return Result.ok()
    }
}