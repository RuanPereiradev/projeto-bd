import { TeacherByCourseDto } from "../../application/dto/teacherDtos/TeacherByCourseDto";
import { ITeacherRepository } from "../../application/interfaces/ITeacherRepository";
import { Teacher } from "../../domain/entities/Teacher";
import { Result } from "../../env/Result";
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
    async findById(userId: number): Promise<Result<Teacher | null>> {
        try {
            const [rows]: any = await db.query(
            `  SELECT 
                    id_usuario,
                    mat_siape,
                    endereco,
                    regime_trabalho,
                    cod_curso,
                    data_contratacao
                FROM Professor
                WHERE id_usuario = ? AND ativo = 1
                `,
                [userId]
            );

            if(rows.length === 0){
                return Result.ok(null)
            }

            const row = rows[0];

            const teacher = new Teacher(
                row.userId,
                row.matSiape,
                row.address,
                row.workRegime,
                row.courseCode,
                row.hireDate
            );

            return Result.ok<Teacher>(teacher)
        } catch (error: any) {
            console.error("Erro ao buscar usuario: ", error)
            return Result.fail("Erro ao acessar o banco de dados")
        }
    }

    async findAll(): Promise<Result<Teacher[]>> {
        try {
            const [rows]: any = await db.query(
                `SELECT 
                    t.id_usuario,
                    t.mat_siape,
                    t.endereco,
                    t.regime_trabalho,
                    t.cod_curso,
                    t.data_contratacao
                FROM  Professor t
                JOIN Usuario u ON u.id_usuario = t.id_usuario
                WHERE u.deleted_at IS NULL
                `
            );

            const teacher = rows.map((row: any) =>
                new Teacher(
                    row.userId,
                    row.matSiape,
                    row.address,
                    row.workRegime,
                    row.courseCode,
                    row.hireDate
                )
            );

            return Result.ok(teacher)

        } catch (error: any) {
            console.error("[teacherRepository.findAll]: ", error)
            return Result.fail("Erro ao listar todos os professores")
        }
    }

    async update(teacher: Teacher): Promise<Result<Teacher>> {
        try {
            if(!teacher.matSiape){
                return Result.fail("Usuarios sem matSiape não podem ser atualizados")
            }
            await db.query(
                `
                UPDATE Professor
                SET endereco = ?,
                    regime_trabalho = ?,
                    cod_curso = ?
                WHERE id_usuario = ?
                `,
                [
                    teacher.address,
                    teacher.workRegime,
                    teacher.courseCode,
                    teacher.userId
                ]
            )
            return Result.ok(teacher)
        } catch (error: any) {
            console.error("[teacherRepository.update]: ", error)
            return Result.fail("Erro ao editar usuario")
        }
    }
    
    async findByCourseCode(courseCode: number): Promise<Result<TeacherByCourseDto[]>> {
        try {
           
           const [rows]: any = await db.query(
            `
            SELECT
                c.cod_curso,
                c.nome_curso AS courseName,
                u.nome AS teacherName,
                p.mat_siape AS matSiape,
                p.regime_trabalho AS workRegime,
                p.data_contratacao AS hireDate
            FROM Professor p
            JOIN Usuario u ON p.id_usuario = u.id_usuario
            JOIN Curso c ON p.cod_curso = c.cod_curso
            WHERE c.cod_curso = ?
            ORDER BY u.nome
            `,[courseCode]
           );
            return Result.ok(rows)
        } catch (error: any) {
            console.error("Erro ao buscar professor: ", error)
            return Result.fail("Erro ao acessar o banco de dados") 
        }
    }
    findByMatSiap(matSiap: string): Promise<Result<Teacher>> {
        throw new Error("Method not implemented.");
    }

}