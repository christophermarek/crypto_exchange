const express = require("express")
const router = express.Router()
const User = require("../models/user")
import passport from "passport"
const jwt = require("jsonwebtoken")

const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../authenticate")

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

router.post("/refreshToken", (req: { signedCookies: { refreshToken: string } }, res: { statusCode: number; send: (arg0: { message?: string; success?: boolean; token?: any }) => void; cookie: (arg0: string, arg1: any, arg2: any) => void }, next: (arg0: any) => any) => {
  const refreshToken = req.signedCookies.refreshToken
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(
        (user: { refreshToken: { refreshToken: any }[]; save: (arg0: (err: any, user: any) => void) => void }) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item: { refreshToken: any }) => item.refreshToken === refreshToken
            )
            if (tokenIndex === -1) {
              res.statusCode = 401
              res.send({ message: "Unauthorized" })
            } else {
              const token = getToken({ _id: userId })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((err: any, user: any) => {
                if (err) {
                  res.statusCode = 500
                  res.send(err)
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send({ success: true, token })
                }
              })
            }
          } else {
            res.statusCode = 401
            res.send({ message: "Unauthorized" })
          }
        },
        (err: any) => next(err)
      )
    } catch (err) {
      res.statusCode = 401
      res.send({ message: "Unauthorized" })
    }
  } else {
    res.statusCode = 401
    res.send({ message: "Unauthorized" })
  }
})

router.get("/me", verifyUser, (req: { user: any }, res: { send: (arg0: any) => void }, next: any) => {
  res.send(req.user)
})

router.get("/logout", verifyUser, (req: { user?: any; signedCookies?: any }, res: { statusCode: number; send: (arg0: { success: boolean }) => void; clearCookie: (arg0: string, arg1: any) => void }, next: (arg0: any) => any) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  User.findById(req.user._id).then(
    (user: any) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item: { refreshToken: any }) => item.refreshToken === refreshToken
      )
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
      }
      user.save((err: { success: boolean }, user: any) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.send({ success: true })
        }
      })
    },
    (err: any) => next(err)
  )
})

module.exports = router