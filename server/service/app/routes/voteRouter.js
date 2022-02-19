const express = require('express')
const voteRouter = express.Router()
const voteController = require('../controllers/voteController');

const authentication = require('../middlewares/authentication')

voteRouter.get("/:barberId", voteController.getVotes)

voteRouter.use(authentication)
voteRouter.post("/:barberId",voteController.upVote )


module.exports = voteRouter;