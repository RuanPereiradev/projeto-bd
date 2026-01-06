import { randomUUID } from "crypto";

export class ApiResponse<T>{
    public readonly _success : boolean;
    public readonly _data?: T | null;
    public readonly _errors ? : string[] | null;
    public readonly _traceId : string;

    constructor(success: boolean, data?: T | null, errors?: string[] | null){
       this._traceId = randomUUID();
       this._success = success;
       this._data = data ?? null;
       this._errors = errors ?? null;
        
    }

    get success(): boolean { return this._success }
    get data(): T | null| undefined { return this._data; }
    get errors(): string[] | null | undefined { return this._errors; }
    get traceId(): string { return this._traceId; }

    public static Ok<T>(data : T) : ApiResponse<T> {
        return new ApiResponse<T>(true, data, null);
    }

    public static fail<T>(errors: string[]): ApiResponse<T>{
        return new ApiResponse<T>(false, null, errors);
    }
}





