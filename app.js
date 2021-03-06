'use strict'
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json({limit: '50mb'})
const app = express()

const userController = require('./server/user/UserController')
const itemController = require('./server/item/ItemController')


app.use(express.static(__dirname + '/node_modules'))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));


app.get('/', (req, res) => {
  res.redirect('index.html')
})

app.listen(3000, '0.0.0.0', function() {
})

// ITEM API
app.post('/api/item', jsonParser, function (req, res) {
  itemController.registerItem(req.body, function (result) {
    if (result) {
      res.statusCode = 200
      res.json(result) 
    } else {
      res.statusCode = 400
    }
  })
})

app.get('/api/items', function (req, res) {
  itemController.getItems(function (result) {
    if (result) {
      res.statusCode = 200
      res.json(result)
    } else {
      res.statusCode = 404
      res.send('No items found')
    }
  })
})

// USER API
app.post('/api/user', jsonParser, function (req, res) {
  userController.registerUser(req.body, function (result) {
    if (result) {
      res.statusCode = 200
      res.json(result)
    } else {
      res.statusCode = 400
    }
  })
})

app.post('/api/user/login', jsonParser, function (req, res) {
  userController.loginUser(req.body, function (result) {
    if (result) {
      res.statusCode = 200
      res.json(result)
    } else {
      res.statusCode = 401
    }
  })
})

module.exports = app

