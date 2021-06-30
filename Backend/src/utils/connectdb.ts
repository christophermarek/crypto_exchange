const mongoose = require("mongoose")
const url = process.env.MONGO_DB_CONNECTION_STRING
const uri: string = `mongodb+srv://chris:${process.env.MONGO_PASSWORD}@cluster0.vgjbs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

const connect = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
connect
  .then((db: any) => {
    console.log("connected to db")
  })
  .catch((err: any) => {
    console.log(err)
  })