import { userType } from "@/domain/enums/userType"

export interface UpdateUserDto{
    id: number;
    name?: string;
    type?: userType;
    address?: string;
}