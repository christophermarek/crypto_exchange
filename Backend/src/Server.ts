import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bnnmarketcallRoutes from './routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const passport = require("passport")


if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    dotenv.config();
}
require("./utils/connectdb")
require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")
const userRouter = require("./routes/userRoutes")

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors())
app.use(passport.initialize())
app.use("/users", userRouter)
app.use(bnnmarketcallRoutes)


app.get('/', (req, res) => {
    res.send('Server is Running')
})

//start server
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)
