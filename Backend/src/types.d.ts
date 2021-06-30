
import { Document } from "mongoose"

interface orderBookEntry extends Document{
    userId: ObjectId
    status: string
    main: string
    pair: string
    datePlaced: Date
    limit: string
    units: string
    direction: string
}


interface userType extends Document {
    username: string
    password: string
    createdAt: any
    updatedAt: any
}