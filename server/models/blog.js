import mongoose from 'mongoose'


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
    }
    ,
    likes: {
        type: [String],
        default: [],
        ref: "User"
    },
    unlikes: {
        type: [String],
        default: [],
        ref: "User"
    },
    category: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog