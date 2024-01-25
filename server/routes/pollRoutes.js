const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/auth/verifyJWT')

const {
    getAllPolls,
    createPoll,
    votePoll,
    getPoll
} = require('../controllers/pollsController');

const { addPollsValidator, addPollsValidatorHandler } = require('../middleware/polls/addPollsValidator');
const { addVoteValidator, addVoteValidatorHandler } = require('../middleware/polls/addVoteValidator');

router.use(verifyJWT)

router.get(
    '/',
    getAllPolls
)

router.post(
    '/',
    addPollsValidator,
    addPollsValidatorHandler,
    createPoll
)

router.get(
    '/:id',
    getPoll
)

router.post(
    '/vote-poll',
    addVoteValidator,
    addVoteValidatorHandler,
    votePoll
)

router.patch(
    '/'
)

router.delete(
    '/',

)



module.exports = router