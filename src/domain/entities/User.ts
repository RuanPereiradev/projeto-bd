import { Result } from "@/env/Result";
import { auditableEntity } from "../common/auditableEntity";
import { userType } from "../enums/userType";


export class User extends auditableEntity {

    private _userId: number;
    private _name: string;
    private _type: userType;
    private _address: string;

    constructor(name:string,type: userType, address: string, userId: number){
        super();
        if(!name.trim()) throw new Error("O nome não pode ser vazio");
        this._userId = userId;
        this._name = name;
        this._type = type;
        this._address = address;
    }

    get userId() { return this._userId }
    get name() { return this._name }
    get type() { return this._type }
    get address() { return this._address }
    get isActive() { return this._isActive }
    get createdAt(){ return this._createdAt }
    get updatedAt(){ return this._updatedAt }

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
        if(newType === undefined || newType === null){
            return Result.fail("O tipo não pode ser nulo")
        }

        this._type = newType;
        return Result.ok()
    }

    changeAddress(newAddress: string): Result<void>{
        if(!newAddress.trim()){
            return Result.fail("O endereço não pode ser nulo");
        }

        this._address = newAddress;
        return Result.ok();
    }
}