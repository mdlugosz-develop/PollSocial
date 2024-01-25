const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const addVoteValidator = [
    check('pollId').notEmpty().isString().custom(value => mongoose.Types.ObjectId.isValid(value)),
    check('optionId').notEmpty().isString().custom(value => mongoose.Types.ObjectId.isValid(value)),
];


const addVoteValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }

    // If validation passes, move to the next middleware or route handler
    next();
}

module.exports = {
    addVoteValidator,
    addVoteValidatorHandler
}
