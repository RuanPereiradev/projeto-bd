import { userType } from "@/domain/enums/userType";

export interface CreateUserDto{
    name: string;
    type: userType;
    address: string;
}