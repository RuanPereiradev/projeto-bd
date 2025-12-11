import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class Book extends auditableEntity{
    private _isbn: string;
    private _title: string
    private _yearLaunch: number;
    private _publisher: string;
    private _quantExemplares: number;
    private _codCategory: number;
    private _codSubCategory: number;
    

    constructor(isbn: string, title: string, yearLaunch: number, publisher: string, quantExemplares: number, codCategory: number, codSubCategory: number){
        super();
        this._isbn = isbn;
        this._title = title;
        this._yearLaunch = yearLaunch;
        this._publisher = publisher;
        this._quantExemplares= quantExemplares;
        this._codCategory = codCategory;
        this._codSubCategory = codSubCategory;
    }

    get isbn(): string{
        return this._isbn;
    }

    get title(): string{
        return this._title;
    }

    get YearLaunch(): number{
        return this._yearLaunch;
    }

    get publisher(): string{
        return this._publisher;
    }

    get quantEx(): number{
        return this._quantExemplares
    }

    get codCategory(): number{
        return this._codCategory
    }

    get codSubCategory(): number{
        return this._codSubCategory
    }

    softDelete(){
        this._deletedAt = new Date();
    }

    changeIsbn(newIsbn: string): Result<void>{
        if(!newIsbn){
            return Result.fail("isbn não pode ser vazio")
        }
        this._isbn = newIsbn;
        return Result.ok();
    }

     changeTitle(newTitle: string): Result<void>{
        if(!newTitle.trim()){
            return Result.fail("titulo não pode ser vazio")
        }
        this._title = newTitle.trim();
        return Result.ok();
    }
    
    changeYearLaunch(newYearLaunch: number): Result<void>{
        if(Number.isInteger(this._yearLaunch)|| this._yearLaunch < 0){
            return Result.fail("titulo não pode ser vazio ou menor que 0")
        }
        this._yearLaunch = newYearLaunch;
        return Result.ok();
    }

    changePublisher(newPublisher: string): Result<void>{
        if(!newPublisher.trim()){
            return Result.fail("publisher não pode ser vazio")
        }
        this._publisher = newPublisher;
        return Result.ok();
    }

    

}