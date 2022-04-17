import { UserRole } from "./user-role.model"

export interface User {
    id: number
    email: string
    password: string
    role: UserRole
}