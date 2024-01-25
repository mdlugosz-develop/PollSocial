const { check, validationResult } = require('express-validator')


const addPollsValidator = [
    check('question')
        .isLength({ min: 1 })
        .withMessage("Question is required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Question must not contain anything other than alphabet")
        .trim(),

]

const addPollsValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    addPollsValidator,
    addPollsValidatorHandler
}