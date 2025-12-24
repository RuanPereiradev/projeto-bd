import { auditableEntity } from "../common/auditableEntity";

export class BookAutor extends auditableEntity{
    private _id: number;
    private _isbn: string;
    private _authorId: number;
    private _mainAuthor: boolean;

    constructor(id: number, isbn: string, authorId: number, mainAuthor: boolean){
        super();
        this._id = id;
        this._isbn = isbn;
        this._authorId = authorId;
        this._mainAuthor = mainAuthor;
    }

    get id(): number{
        return this._id;
    }

    get isbn(): string{
        return this._isbn;
    }

    get authorId(): number{
        return this._authorId;
    }

    get mainAuthor(): boolean{
        return this._mainAuthor;
    }

    softDelete(){
        this._deletedAt  = new Date();
    }

}