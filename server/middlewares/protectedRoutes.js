import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(404).json({ message: 'Unauthorized' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export default protectedRoute