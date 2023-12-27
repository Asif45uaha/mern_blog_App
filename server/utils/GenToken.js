
import jwt from 'jsonwebtoken'

const genToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' })

        res.cookie('jwt', token, {
            withCredentials: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 15 * 24 * 60 * 60 * 1000
        })

        return token
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export default genToken