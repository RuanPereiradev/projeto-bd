import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";
import { userType } from "../enums/userType";


export class user extends auditableEntity {

    private _id: string;
    private _name: string;
    private _type: userType;
    private _endereco: string;

    constructor(name:string,type: userType, endereco: string, id?: string){
        super();
        if(!name.trim()) throw new Error("O nome não pode ser vazio");
        this._id = id ?? crypto.randomUUID();
        this._name = name;
        this._type = type;
        this._endereco = endereco;
    }

    get id() { return this._id };
    get name() { return this._name };
    get type() { return this._type };
    get endereco() { return this._endereco };


    softDelete(){
        this._deletedAt = new Date();
    }

    changeName(newName:string): Result<void>{
        if(!newName.trim()){
            return Result.fail("O nome não pode ser vazio");
        }
        this._name = newName.trim();
        return Result.ok();
    }


    changeType(newType: userType): Result<void>{
        if(!newType){
            return Result.fail("O tipo não pode ser nulo");
        }

        this._type = newType;
        return Result.ok()
    }

    changeEndereco(newEnd: string): Result<void>{
        if(newEnd){
            return Result.fail("O endereço não pode ser nulo");
        }

        this._endereco = newEnd;
        return Result.ok();
    }
}