import { NONAME } from "node:dns";
import passport from "passport"
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

//get env vars, need to convert from undefined
let tokenExpiry: string;
if(process.env.REFRESH_TOKEN_EXPIRY != undefined){
    tokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
}else{
    tokenExpiry = 'error';
}
let sessionExpiry: string;
if(process.env.SESSION_EXPIRY != undefined){
    sessionExpiry = process.env.SESSION_EXPIRY;
}else{
    sessionExpiry = 'error';
}


exports.COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: true,
  signed: true,
  maxAge: eval(tokenExpiry) * 1000,
  sameSite: "none",
}
exports.getToken = (user: any) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(sessionExpiry),
  })
}
exports.getRefreshToken = (user: any) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(tokenExpiry),
  })
  return refreshToken
}
exports.verifyUser = passport.authenticate("jwt", { session: false })