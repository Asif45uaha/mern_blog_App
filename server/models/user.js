import mongoose from 'mongoose'



const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    profile: {
        type: String,
        default: ""
    },
    blogNames: {
        type: [String],
        ref: "Blog"
    }
})

const User = mongoose.model('User', userSchema)


export default User