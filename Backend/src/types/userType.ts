import { Document } from "mongoose"

export interface userType extends Document {
    username: string
    password: string
    createdAt: any
    updatedAt: any
}