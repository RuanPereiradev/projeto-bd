import { CreateStudentDto } from "@/application/dto/studentDtos/CreateStudentDto";
import { CreateUserDto } from "@/application/dto/userDtos/CreateUserDto";
import { IStudentRepository } from "@/application/interfaces/IStudentRepository";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { Student } from "@/domain/entities/Student";
import { Teacher } from "@/domain/entities/Teacher";
import { User } from "@/domain/entities/User";
import { userType } from "@/domain/enums/userType";
import { Result } from "@/env/Result";

export class CreateStudentUseCase{
    constructor(private studentRepository: IStudentRepository,
                private userRepository: IUserRepository
    ){}

    async execute(studentDto: CreateStudentDto, userDto: CreateUserDto): Promise<Result<Student>>{
        const user = new User(
            userDto.name,
            userType.ALUNO,
            userDto.address
        )
        const userResult = await this.userRepository.create(user)
        if(userResult.isFailure){
            return Result.fail(userResult.getError())
        }

        const createdUser = userResult.getValue()

        const student = new Student(
            createdUser.userId!,
            studentDto.registration,
            studentDto.codCourse,
            studentDto.dataEntry,
            studentDto.expectedCompletionDate
        )

        const createdStudent = await this.studentRepository.create(student)
        if(createdStudent.isFailure){
            return Result.fail(createdStudent.getError())
        }

        return Result.ok(createdStudent.getValue())
    }
}