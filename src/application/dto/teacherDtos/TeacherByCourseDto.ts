import { RegimeType } from "@/domain/enums/RegimeType";

export interface TeacherByCourseDto{
courseName: string;
  teacherName: string;
  matSiape: string;
  workRegime: RegimeType;
  hireDate: Date;
}