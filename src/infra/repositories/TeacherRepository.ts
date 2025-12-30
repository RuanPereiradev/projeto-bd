import { ITeacherRepository } from "@/application/interfaces/ITeacherRepository";
import { Teacher } from "@/domain/entities/Teacher";
import { RegimeType } from "@/domain/enums/RegimeType";
import { Result } from "@/env/Result";
import { db } from "../config/db";

export class TeacherRepository implements ITeacherRepository{
    async create(teacher: Teacher): Promise<Result<Teacher>> {
        try {
            await db.query(

                ` INSERT INTO Professor (
                    id_usuario,
                    mat_siape,
                    regime_trabalho,
                    codigo_curso,
                    data_contratacao
                )
                VALUES (?, ?, ?, ?, ?)`,
                [
                    teacher.userId,
                    teacher.matSiape,
                    teacher.workRegime,
                    teacher.courseCode,
                    teacher.hireDate
                ]
            );
            return Result.ok(teacher)
        } catch (error: any) {
            console.error("[TeacherRepository.create]", error)

            if(error.code === "ER_DUP_ENTRY"){
                return Result.fail("Professor já cadastrado")
            }

            return Result.fail("Erro ao criar professor")
        }
    }
    findById(userId: number): Promise<Result<Teacher | null>> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Result<Teacher[]>> {
        throw new Error("Method not implemented.");
    }
    update(teacher: Teacher): Promise<Result<Teacher>> {
        throw new Error("Method not implemented.");
    }
    softDelete(userId: number): Promise<Result<void>> {
        throw new Error("Method not implemented.");
    }
    findByWorkRegime(workRegime: RegimeType): Promise<Result<Teacher>> {
        throw new Error("Method not implemented.");
    }
    findByCourseCode(courseCode: number): Promise<Result<Teacher>> {
        throw new Error("Method not implemented.");
    }
    findByMatSiap(matSiap: string): Promise<Result<Teacher>> {
        throw new Error("Method not implemented.");
    }

}