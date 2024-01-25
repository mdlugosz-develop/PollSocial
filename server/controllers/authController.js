const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const { username, email, password, roles } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Username already in use' })
    }

    const duplicateEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateEmail) {
        return res.status(409).json({ message: 'Email already in use' })
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd, email }
        : { username, "password": hashedPwd, email, roles }

    const user = await User.create(userObject);
    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data recieved ' })
    }
}

const signin = async (req, res, next) => {

    const { username, password } = req.body;
    const foundUser = await User.findOne({ username })

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const payload = {
        id: foundUser._id,
        username: foundUser.username,
        roles: foundUser.role
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "6h",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });


    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        //secure: true, enable for production
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 1000
    })

    // send accessToken containing username and roles
    res.json({ accessToken })

}

const refreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized: No Cookie ' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const payload = {

                username: foundUser.username,
                roles: foundUser.role

            }
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}

const logout = (req, res) => {

    try {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204) //No Content
        res.clearCookie('jwt', { httpOnly: true })
        res.json({ message: 'Cookie cleared' })

    } catch (err) {
        res.status(400).json({ message: 'some error boi' })
    }

}

module.exports = {
    signin,
    signup,
    refreshToken,
    logout
}


