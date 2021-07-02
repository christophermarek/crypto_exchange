const express = require("express")
const router = express.Router()
const User = require("../models/user")
import passport from "passport"
const jwt = require("jsonwebtoken")

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")

router.post("/signup", (req: { body: { firstName: any; username: any; password: any; lastName: string } }, res: { statusCode: number; send: (arg0: { name?: string; message?: string; success?: boolean; token?: any }) => void; cookie: (arg0: string, arg1: any, arg2: any) => void }, next: any) => {
  // Verify that first name is not empty
  if (!req.body.firstName) {
    res.statusCode = 500
    res.send({
      name: "FirstNameError",
      message: "The first name is required",
    })
  } else {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err: { name?: string | undefined; message?: string | undefined; success?: boolean | undefined; token?: any }, user: { firstName: any; lastName: string; _id: any; refreshToken: { refreshToken: any }[]; save: (arg0: (err: any, user: any) => void) => void }) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          user.firstName = req.body.firstName
          user.lastName = req.body.lastName || ""
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save((err: { name?: string | undefined; message?: string | undefined; success?: boolean | undefined; token?: any }, user: any) => {
            if (err) {
              res.statusCode = 500
              res.send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ success: true, token })
            }
          })
        }
      }
    )
  }
})

router.post("/login", passport.authenticate("local"), (req: { user: { _id: any } }, res: { statusCode: number; send: (arg0: { success: boolean; token: any }) => void; cookie: (arg0: string, arg1: any, arg2: any) => void }, next: (arg0: any) => any) => {
  const token = getToken({ _id: req.user._id })
  const refreshToken = getRefreshToken({ _id: req.user._id })
  User.findById(req.user._id).then(
    (user: { refreshToken: { refreshToken: any }[]; save: (arg0: (err: any, user: any) => void) => void }) => {
      user.refreshToken.push({ refreshToken })
      user.save((err: any, user: any) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ success: true, token })
        }
      })
    },
    (err: any) => next(err)
  )
})

router.post("/refreshToken", (req: { signedCookies?: {} | undefined }, res: { statusCode: number; send: (arg0: string) => void; cookie: (arg0: string, arg1: any, arg2: any) => void }, next: (arg0: any) => any) => {
  const { signedCookies = {} } = req
  const refreshToken = signedCookies
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(
        (user: { refreshToken: any[]; save: (arg0: (err: any, user: any) => void) => void }) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item: { refreshToken: any }) => item.refreshToken === refreshToken
            )
            if (tokenIndex === -1) {
              res.statusCode = 401
  console.log('here')

              res.send("Unauthorized")
            } else {
              const token = getToken({ _id: userId })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((err: string, user: any) => {
                if (err) {
                  res.statusCode = 500
                  res.send(err)
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send(JSON.stringify({ success: true, token }))
                }
              })
            }
          } else {
            res.statusCode = 401
  console.log('here1')

            res.send("Unauthorized")
          }
        },
        (err: any) => next(err)
      )
    } catch (err) {
      res.statusCode = 401
  console.log('here2')
      console.log(err);
      res.send("Unauthorized")
    }
  } else {
    res.statusCode = 401
  console.log('here3')

    res.send("Unauthorized")
  }
})

module.exports = router