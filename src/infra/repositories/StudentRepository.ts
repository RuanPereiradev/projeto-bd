import { IStudentRepository } from "@/application/interfaces/IStudentRepository";
import { Student } from "@/domain/entities/Student";
import { Result } from "@/env/Result";
import { db } from "../config/db";
import { User } from "@/domain/entities/User";

export class StudentRepository implements IStudentRepository{
    findByRegistration(registration: string): Promise<Result<Student>> {
        throw new Error("Method not implemented.");
    }
    async create(student: Student): Promise<Result<Student>> {
        try {
            await db.query(
                ` INSERT INTO Aluno (
                    id_usuario,
                    matricula,
                    cod_curso,
                    data_ingresso,
                    data_conclusao_prevista
                )
                VALUES (?, ?, ?, ?, ?)`,
                [
                    student.userId,
                    student.registration,
                    student.codCourse,
                    student.dateEntry,
                    student.expectedCompletionDate
                ]
            );

            return Result.ok(student)

        } catch (error: any) {
            console.error("[StudentRepository.create]", error)

            if(error.code === "ER_DUP_ENTRY"){
                return Result.fail("estudante já cadastrado")
            }

            return Result.fail("Erro ao criar estudante")
        }
    }
    async findById(id: number): Promise<Result<Student | null>> {
        try {
            const [rows]: any = await db.query(
            `
            SELECT id_usuario, matricula, cod_curso, data_ingresso, data_conclusao_prevista
            FROM Estudante
            WHERE id_usuario = ? AND ativo = 1
            `,
            [id]
        );

        if(rows.length === 0){
            return Result.ok(null)
        }

        const row = rows[0]

        const student = new Student(
            row.userId,
            row.registration,
            row.codCourse,
            row.dateEntry,
            row.expectedCompletionDate,
        );

        return Result.ok<Student>(student)

        } catch (error: any) {
            console.error("Erro ao buscar usuario: ", error)
            return Result.fail("Erro ao acessar o banco de dados");         
        }
    }
    findAll(): Promise<Result<Student[]>> {
        throw new Error("Method not implemented.");
    }
    async update(student: Student): Promise<Result<Student>> {
        try {
            if(!student.userId){
                return Result.fail("Usuários sem id não podem ser atualizados")
            }
            await db.query(
                `
                UPDATE Estudante
                SET cod_curso = ?,
                    data_conclusao_prevista = ?
                WHERE id_usuario = ?
                `,
                [
                    student.codCourse,
                    student.expectedCompletionDate,
                    student.userId
                ]
            )
            return Result.ok(student)
        } catch (error: any) {
            return Result.fail("Erro ao editar estudante")
        }
    }
   
    async findByCodCourse(codCourse: number): Promise<Result<Student[]>> {
        try {
            const [rows]: any = await db.query(
                `
            SELECT 
                a.id_usuario,
                a.matricula,
                a.cod_curso,
                a.data_ingresso,
                a.data_conclusao_prevista
            FROM Aluno a
            JOIN Usuario u ON u.id_usuario = a.id_usuario
            WHERE a.cod_curso = ?
              AND u.ativo = 1
            `,
            [codCourse]
            );

        const students = rows.map((row: any)=> 
            new Student(
                row.userId,
                row.registration,
                row.codCourse,
                new Date(row.dateEntry),
                new Date(row.expectedCompletionDate),
            )
        );

        return Result.ok(students)

        } catch (error: any) {
             console.error("Erro ao buscar usuário:", error);
            return Result.fail("Erro ao acessar o banco de dados");
        }
    }
    

}