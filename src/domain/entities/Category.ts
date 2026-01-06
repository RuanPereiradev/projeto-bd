import { Result } from "../../env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class Category extends auditableEntity{
    private _codCategory: number;
    private _description: string;

    constructor(codCategory: number, description: string){
        super();
        this._codCategory = codCategory;
        this._description = description;
    }

    get codCategory(): number{
        return this._codCategory;
    }

    get description(): string{
        return this._description;
    }

    softDelete(){
        this._deletedAt = new Date();
    }

    changeDescription(newDescription: string): Result<void>{
        if(!newDescription.trim()){
            return Result.fail("descrição não pode ser nula")
        }
        this._description = newDescription;
         return Result.ok();
    }
}