import { Teacher } from "@/domain/entities/Teacher";
import { RegimeType } from "@/domain/enums/RegimeType";
import { Result } from "@/env/Result";


export interface ITeacherRepository{
    create(teacher:Teacher): Promise<Result<Teacher>>;
    findById(userId: number): Promise<Result<Teacher| null>>
    findAll(): Promise<Result<Teacher[]>>
    update(teacher: Teacher): Promise<Result<Teacher>>
    softDelete(userId: number): Promise<Result<void>>


    findByWorkRegime(workRegime: RegimeType): Promise<Result<Teacher>>
    findByCourseCode(courseCode: number): Promise<Result<Teacher>>
    findByMatSiap(matSiap: string): Promise<Result<Teacher>>
    

}