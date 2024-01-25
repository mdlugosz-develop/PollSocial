const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/auth/verifyJWT')

const {
    getAllUsers, updateUser, deleteUser
} = require('../controllers/usersController');

router.get(
    '/',
    getAllUsers
)

router.patch(
    '/',
    updateUser
)

router.delete(
    '/',
    deleteUser
)

module.exports = router;