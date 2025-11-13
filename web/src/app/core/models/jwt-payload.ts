import { Roles } from "./roles";

export interface UserPayload{
    id: number;
    name: string;
    email: string;
    lastName: string;
    role: Roles;   
}