import { Result } from "../../env/Result";
import { auditableEntity } from "../common/auditableEntity";

export class Phone extends auditableEntity{
    private _phoneId: number;
    private _userId: number;
    private _telephone: string;

    constructor(phoneId: number, userId: number, telephone: string){
        super();
        this._phoneId = phoneId;
        this._userId = userId;
        this._telephone = telephone;
    }

    get phoneId(): number{
        return this._phoneId;
    }

    get userId(): number{
        return this._userId;
    }

    get telephone(): string{
        return this._telephone;
    }

    softDelete(){
        this._deletedAt = new Date();
    }

    changeTelefone(newTelephone: string ): Result<void>{
        if(!newTelephone.trim()){
            return Result.fail("O telefone não pode ser vazio")
        }
        this._telephone = newTelephone.trim();
        return Result.ok();
    }
}