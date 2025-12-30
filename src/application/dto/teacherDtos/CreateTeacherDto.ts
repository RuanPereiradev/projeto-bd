import { RegimeType } from "@/domain/enums/RegimeType";

export interface CreateTeacherDto{
    matSiap: string;
    address: string;
    workRegime: RegimeType;
    courseCode: number;
    hireDate: Date;
}