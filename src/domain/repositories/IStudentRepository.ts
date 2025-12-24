import { Result } from "@/env/Result";
import { User } from "../entities/User";
import { Student } from "../entities/Student";

export interface IStudentRepository{
    create(student: Student): Promise<Result<Student>>;
    findById(id: number): Promise<Result<Student| null>>
    findAll(): Promise<Result<Student[]>>
    update(student: Student): Promise<Result<Student>>
    softDelete(id: number): Promise<Result<void>>
}