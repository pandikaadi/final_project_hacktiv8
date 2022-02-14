const express = require('express');
const barberRouter = express.Router();
const barberController = require('../controllers/barberController');

barberRouter.get('/', barberController.getBarbers)
barberRouter.get('/:id', barberController.getBarberById)
barberRouter.post('/', barberController.postBarber)

module.exports = barberRouter