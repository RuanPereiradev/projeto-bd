import { auditableEntity } from "../common/auditableEntity";

export class Employee extends auditableEntity{

    private _userId: number;
    private _registration: string;

    constructor(mat: string, userId: number){
        super(),
        this._userId = userId;
        this._registration = mat;
    }

    get userId(): number { return this._userId }
    get mat(): string { return this._registration }
    get isActive(): boolean { return this._isActive }
    get deletedAt(): Date | null { return this._deletedAt }

     softDelete(){
        this._deletedAt = new Date();
    }
    
}