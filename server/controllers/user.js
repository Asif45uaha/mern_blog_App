import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import genToken from '../utils/GenToken.js'
import { v2 as cloudinary } from 'cloudinary'

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const newpass = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: newpass })

        if (newUser) {
            return res.status(201).json({ message: "User created successfully", newUser })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const passMatches = await bcrypt.compare(password, user.password)

        if (passMatches) {
            genToken(user._id, res)
            res.status(200).json({ _id: user._id, name: user.name, email: user.email, profile: user?.profile })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 1
        })
        res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

const getProfileInfo = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, } = req.body
        let { profile } = req.body
        const user = await User.findById(req.user._id)

        if (!user) { return res.status(400).json({ message: "User not found" }) }

        if (id !== user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized you can't update profile of other user" })
        }

        if (profile) {
            const upload = await cloudinary.uploader.upload(profile)
            profile = upload.secure_url
        }
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, profile }, { new: true })
        res.status(200).json({ message: "Profile updated successfully", updatedUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}
export { createUser, loginUser, logoutUser, getProfileInfo, updateProfile }