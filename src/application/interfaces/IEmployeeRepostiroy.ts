import { Result } from "@/env/Result";
import { Employee } from "../../domain/entities/Employee";

export interface IEmployeeRepository{
    create(employee:Employee): Promise<Result<Employee>>;
    findByUserId(userId: number): Promise<Result<Employee | null>>
    findAll(): Promise<Result<Employee[]>>
    update(employee: Employee): Promise<Result<Employee>>
    softDelete(id: number): Promise<Result<void>>

    findByRegistration(registration: string): Promise<Result<Employee>>

}