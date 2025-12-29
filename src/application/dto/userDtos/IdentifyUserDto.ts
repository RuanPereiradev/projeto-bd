import { userType } from "@/domain/enums/userType";

export interface IdentifyUserDto{
    type: userType 
    identifier: string 
}