import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";
import { Email } from "../valueObjects/Email";

export class Author extends auditableEntity{
    private _autorId: number;
    private _name: string;
    private _email: Email;
    private _nacionality: string;

    constructor(autorId:number, name: string, email: Email, nacionality: string){
        super();
        this._autorId = autorId;
        this._name = name;
        this._email = email;
        this._nacionality = nacionality;
    }

    get autorId(): number{
        return this._autorId;
    }

    get name(): string{
        return this._name;
    }

    get email(): Email{
        return this._email;
    }

    get nacionality(): string{
        return this._nacionality
    }

    changeEmail(newEmail: Email):Result<void>{
        if(!newEmail){
            return Result.fail("Email não pode ser nulo")
        }
        this._email = newEmail
        return Result.ok()
    }

    changeNacionality(newNacionality: string): Result<void>{
        if(!newNacionality){
            return Result.fail("Nacionalidade não pode ser nula")
        }
        this._nacionality = newNacionality;
        return Result.ok()
    }
}