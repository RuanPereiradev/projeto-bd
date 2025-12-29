import { IdentifyUserDto } from "@/application/dto/userDtos/IdentifyUserDto";
import { IEmployeeRepository } from "@/application/interfaces/IEmployeeRepostiroy";
import { IStudentRepository } from "@/application/interfaces/IStudentRepository";
import { ITeacherRepository } from "@/application/interfaces/ITeacherRepository";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { userType } from "@/domain/enums/userType";
import { Result } from "@/env/Result";
import { resolve } from "path";

export class IdentifyUserUseCase{
    constructor(private userRepository: IUserRepository,
                private employeeRepository: IEmployeeRepository,
                private studentRepository: IStudentRepository,
                private teacherRepository: ITeacherRepository
    ){}

    async execute(dto: IdentifyUserDto): Promise<Result<User | null>>{
        switch (dto.type) {
            case userType.ALUNO:
                const studentResult = await this.studentRepository.findByRegistration(dto.identifier)
                if(studentResult.isFailure || !studentResult.getValue()){
                    return Result.fail("student not found")
                }
                return await this.userRepository.findById(studentResult.getValue().userId);

            case userType.PROFESSOR:
                const teacherResult = await this.teacherRepository.findByMatSiap(dto.identifier);
                if(teacherResult.isFailure || !teacherResult.getValue()){
                    return Result.fail("teacher not found")
                }
                return await this.userRepository.findById(teacherResult.getValue().userId);

            case userType.FUNCIONARIO:
                const employeeResult = await this.employeeRepository.findByRegistration(dto.identifier);
                if(employeeResult.isFailure || employeeResult.getValue()){
                    return Result.fail("employee not found")
                }
                return await this.userRepository.findById(employeeResult.getValue().userId)
            default:

            return Result.fail("Tipo de usuário inválido")
        }
    }
}