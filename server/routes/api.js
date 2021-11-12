const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const dbUrl =
  'mongodb+srv://testuser:test@eventsdb.dwtnh.mongodb.net/eventsdb?retryWrites=true&w=majority'

mongoose.connect(dbUrl, (error) => {
  if (error) {
    console.log('error!', error)
  } else {
    console.log('connected mongodb')
  }
})

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token == 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized Request')
  }
  req.userId = payload.subject
  next()
}

router.get('/', (req, res) => {
  res.send('From api routee')
})

router.post('/register', (req, res) => {
  const userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error)
    } else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token })
    }
  })
})

router.post('/login', (req, res) => {
  const userData = req.body
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send('İnvalid email')
      } else {
        if (user.password !== userData.password) {
          res.status(401).send('İnvalid password')
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token })
        }
      }
    }
  })
})

router.get('/events', (req, res) => {
  let events = [
    {
      _id: 1,
      name: 'ella',
      description: 'desc',
      date: '12/11/2021',
    },
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let events = [
    {
      _id: 1,
      name: 'ella',
      description: 'desc',
      date: '12/11/2021',
    },
  ]
  res.json(events)
})

module.exports = router
