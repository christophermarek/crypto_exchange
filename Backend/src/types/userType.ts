import { Document } from "mongoose"

export interface userType extends Document {
    _id: string
    username: string
    password: string
    createdAt: any
    updatedAt: any
}