import { Result } from "@/env/Result";
import { User } from "../../domain/entities/User";
import { Student } from "../../domain/entities/Student";

export interface IStudentRepository{
    create(student: Student): Promise<Result<Student>>;
    findById(id: number): Promise<Result<Student| null>>
    findAll(): Promise<Result<Student[]>>
    update(student: Student): Promise<Result<Student>>

    findByCodCourse(codCourse: number): Promise<Result<Student[]>>
    findByRegistration(registration: string): Promise<Result<Student>>
}