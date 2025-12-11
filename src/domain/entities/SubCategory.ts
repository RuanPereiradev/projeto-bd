import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class SubCategory extends auditableEntity{
    private _codSubCategory: number;
    private _description: string;
    private _codCategory: number;

    constructor(codSubCategory: number, description: string, codCategory: number){
        super();
        if(codSubCategory === null || codSubCategory === undefined){
            throw new Error("codSubcategory inválido")
        }
        if(!description.trim()){
            throw new Error("description Obrigatooria")
        }
        if(codCategory === null || codCategory === undefined){
            throw new Error("CodCategory Obrigatooria")
        }
        this._codSubCategory = codSubCategory;
        this._description = description;
        this._codCategory = codCategory;
    }

    get codSubCategory(): number{
        return this._codSubCategory;
    }

    get description(): string{
        return this._description;
    }

    get codCategory(): number{
        return this._codCategory;
    }

    softDelete(){
        this._deletedAt = new Date();
    }

    changeDescription(newDescription: string): Result<void>{
        if(!newDescription.trim()){
            return Result.fail("Categoria nao pode ser nula")
        }
        this._description = newDescription;
        return Result.ok()
    } 

    changeSubCategory(newSubCategory: number): Result<void>{
        if(newSubCategory === null || newSubCategory === undefined){
            return Result.fail("SubCategory não pode ser nula")
        }
        this._codSubCategory = newSubCategory;
        return Result.ok()
    }

    changeCategory(newCategory: number): Result<void>{
        if(newCategory === null || newCategory === undefined){
            return Result.fail("Category não pode ser nula")
        }
        this._codCategory = newCategory;
        return Result.ok()
    }

}