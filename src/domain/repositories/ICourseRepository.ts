import { Result } from "@/env/Result";
import { Course } from "../entities/Course";

export interface ICourseRepository{
        create(course:Course): Promise<Result<Course>>;
        findByCodCourse(codCourse: number): Promise<Result<Course| null>>
        findAll(): Promise<Result<Course[]>>
        update(course: Course): Promise<Result<Course>>
        softDelete(codCourse: number): Promise<Result<void>>

        findByName(nameCourse: string): Promise<Result<Course>>
        
}