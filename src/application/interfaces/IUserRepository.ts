import { User } from "@/domain/entities/User";
import { Result } from "@/env/Result";

export interface IUserRepository{
    create(user:User): Promise<Result<User>>;
    findById(id: number): Promise<Result<User| null>>
    findAll(): Promise<Result<User[]>>
    update(user: User): Promise<Result<User>>
    softDelete(id: number): Promise<Result<void>>
}