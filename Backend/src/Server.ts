import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bnnmarketcallRoutes from './routes'
import bodyParser from 'body-parser'

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    dotenv.config();
}
require("./utils/connectdb")

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
app.use(bodyParser.json())
app.use(cors())
app.use(bnnmarketcallRoutes)

app.get('/', (req, res) => { res.send('Server is Running') })



app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)
