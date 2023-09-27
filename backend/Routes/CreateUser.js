const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const jwtSecret = 'MyNameisFarhanQaziIloveThisWebsite'

router.post(
  '/createuser',
  body('email').isEmail(),
  body('name').isLength({ min: 2 }),
  body('location').isLength({ min: 1 }),
  body('password', 'Incorrect Response').isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }

    const salt = await bcrypt.genSalt(10)
    let setPassword = await bcrypt.hash(req.body.password, salt)
    try {
      await User.create({
        name: req.body.name,
        password: setPassword,
        email: req.body.email,
        location: req.body.location,
      })
      res.json({ success: true })
    } catch (err) {
      console.log(err)
      res.json({ success: false })
    }
  }
)

router.post(
  '/loginuser',
  body('email').isEmail(),
  body('password', 'Incorrect Response').isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }
    let email = req.body.email
    try {
      let userData = await User.findOne({ email })
      if (!userData) {
        return res
          .status(400)
          .json({ errors: 'Try logging in with correct credentials' })
      }
      console.log(req.body.password)
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      )
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: 'Try logging in with correct credentials' })
      }
      const data = {
        user: {
          id: userData.id,
        },
      }
      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken: authToken })
    } catch (err) {
      console.log(err)
      res.json({ success: false })
    }
  }
)

module.exports = router
