const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const opts = {jwtFromRequest: '0', secretOrKey: '0'}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
const User = require("../models/user")

if(process.env.JWT_SECRET != undefined){
  opts.secretOrKey = process.env.JWT_SECRET
}else{
  console.log("error fetching JWT secret from env vars.. shutting down");
  process.exit(1);
}

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, function (jwt_payload: { _id: any }, done: (arg0: null, arg1: boolean) => any) {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch user details in each request.
    User.findOne({ _id: jwt_payload._id }, function (err: any, user: any) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
        // or you could create a new account
      }
    })
  })
)