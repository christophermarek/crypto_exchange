import passport from "passport"
import LocalStrategy, { Strategy } from "passport-local"
const User = require("../models/user")
//Called during login/sign up.
passport.use(new Strategy(User.authenticate()))
//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser())