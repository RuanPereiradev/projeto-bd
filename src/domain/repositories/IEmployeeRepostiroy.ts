import { Result } from "@/env/Result";
import { Employee } from "../entities/Employee";

export interface IEmployeeRepository{
    create(employee:Employee): Promise<Result<Employee>>;
    findById(id: number): Promise<Result<Employee| null>>
    findAll(): Promise<Result<Employee[]>>
    update(employee: Employee): Promise<Result<Employee>>
    softDelete(id: number): Promise<Result<void>>

    findByMat(employee: string): Promise<Result<Employee>>

}