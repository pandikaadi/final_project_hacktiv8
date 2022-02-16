const express = require('express')
const registerRouter = express.Router()
const registerController = require('../controllers/registerController')


registerRouter.post('/',registerController.postRegister)


module.exports = registerRouter