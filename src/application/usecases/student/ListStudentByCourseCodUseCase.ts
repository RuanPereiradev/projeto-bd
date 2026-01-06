import { ListStudentByCourseDto } from "@/application/dto/studentDtos/StudentByCourseDto";
import { IStudentRepository } from "@/application/interfaces/IStudentRepository";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { Student } from "@/domain/entities/Student";
import { Result } from "@/env/Result";

export class ListStudentByCourseCodUseCase{
    constructor(private studentRepository: IStudentRepository,
                private userRepository: IUserRepository
    ){}

    async execute(dto: ListStudentByCourseDto): Promise<Result<Student[]>>{
        if(!dto.codCourse){
            return Result.fail("Necessario informar o codigo do curso")
        }
        const studentByCourseResult = await this.studentRepository.findByCodCourse(dto.codCourse)
        if(studentByCourseResult.isFailure){
            console.log("Erro ao busar aluno(s) por curso")
            return Result.fail(studentByCourseResult.getError())
        }
        return Result.ok<Student[]>(studentByCourseResult.getValue())

    }
}