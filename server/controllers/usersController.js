const bcrypt = require('bcrypt');
const User = require('../models/User')
const Poll = require('../models/Poll')


const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No Users found' })
    }
    res.json(users)
}


const updateUser = async (req, res) => {
    const { id, username, password, roles } = req.body

    if (!id || !username || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    //check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    //allow updates to the origional user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        //Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

const deleteUser = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const poll = await Poll.findOne({ user: id }).lean().exec()
    if (poll) {
        return res.status(400).json({ message: 'User has posts' })
    }

    const result = await User.findByIdAndDelete(id)

    if (!result) {
        return res.status(400).json({ message: 'Error deleting user' })
    }

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)

}

const getUsersFollowers = async (req, res) => {

    const { username } = req.body

    const foundUser = await user.findOne({ username })
    if (!foundUser) {
        return res.status(400).json({ message: 'User not found' })
    }

    const followers = foundUser.followers

    res.status(200).json(followers)

}

const getUsersFollowing = async (req, res) => {

    const { username } = req.body

    const foundUser = await user.findOne({ username })
    if (!foundUser) {
        return res.status(400).json({ message: 'User not found' })
    }

    const following = foundUser.following

    res.status(200).json(following)

}


module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUsersFollowers,
    getUsersFollowing
}
