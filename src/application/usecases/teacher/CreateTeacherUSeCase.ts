import { CreateTeacherDto } from "@/application/dto/teacherDtos/CreateTeacherDto";
import { CreateUserDto } from "@/application/dto/userDtos/CreateUserDto";
import { ITeacherRepository } from "@/application/interfaces/ITeacherRepository";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { Teacher } from "@/domain/entities/Teacher";
import { User } from "@/domain/entities/User";
import { userType } from "@/domain/enums/userType";
import { Result } from "@/env/Result";
import { create } from "domain";

export class CreateTeacherUseCase{
    constructor(private techerRepository: ITeacherRepository,
                private userRepository: IUserRepository
    ){}

    async execute(teacherDto: CreateTeacherDto, userDto: CreateUserDto): Promise<Result<Teacher>>{
        const user = new User(
            userDto.name,
            userType.PROFESSOR,
            userDto.address
        )
        const userResult = await this.userRepository.create(user)
        if(userResult.isFailure)
            return Result.fail(userResult.getError())

        const createdUser = userResult.getValue()

        const teacher = new Teacher(
            createdUser.userId!,
            teacherDto.matSiap,
            teacherDto.address,
            teacherDto.workRegime,
            teacherDto.courseCode,
            teacherDto.hireDate
        )
        const createdTeacher = await this.techerRepository.create(teacher)
        if(createdTeacher.isFailure){
            return Result.fail(createdTeacher.getError())
        }

        return Result.ok(createdTeacher.getValue())
    }

}