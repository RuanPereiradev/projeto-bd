import { auditableEntity } from "../common/auditableEntity";

export class LivroAutor extends auditableEntity{
    private _id: number;
    private _isbn: string;
    private _idAuthor: number;
    private _mainAuthor: number;

    constructor(id: number, isbn: string, idAuthor: number, mainAuthor: number){
        super();
        this._id = id;
        this._isbn = isbn;
        this._idAuthor = idAuthor;
        this._mainAuthor = mainAuthor;
    }

    get id(): number{
        return this._id;
    }

    get isbn(): string{
        return this._isbn;
    }

    get idAuthor(): number{
        return this._idAuthor;
    }

    get mainAuthor(): number{
        return this._mainAuthor;
    }

    softDelete(){
        this._deletedAt  = new Date();
    }

}