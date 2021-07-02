const express = require("express")
const router = express.Router()
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
module.exports = router