import { Result } from "@/env/Result";
import { User } from "../entities/User";
import { Teacher } from "../entities/Teacher";
import { RegimeType } from "../enums/RegimeType";

export interface ITeacherRepository{
    create(teacher:Teacher): Promise<Result<Teacher>>;
    findById(userId: number): Promise<Result<Teacher| null>>
    findAll(): Promise<Result<Teacher[]>>
    update(teacher: Teacher): Promise<Result<Teacher>>
    softDelete(userId: number): Promise<Result<void>>


    findByWorkRegime(workRegime: RegimeType): Promise<Result<Teacher>>
    findByCourseCode(courseCode: number): Promise<Result<Teacher>>
    

}