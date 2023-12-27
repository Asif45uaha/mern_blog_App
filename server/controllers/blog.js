import Blog from "../models/blog.js";
import User from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary'

const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body
        let { image } = req.body
        const userId = req.user._id
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exist" })
        }

        if (image) {
            const result = await cloudinary.uploader.upload(image)
            image = result.secure_url
        }
        const blog = new Blog({ title, content, category, image, authorId: userId, authorName: user.name })
        await blog.save()

        await User.findByIdAndUpdate(userId, { $push: { blogNames: blog.title } })
        return res.status(201).json({ message: "Blog created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}


const getBlogInfo = async (req, res) => {
    try {

        const userId = req.user._id
        const { id } = req.params
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exist" })
        }
        const blog = await Blog.findById(id)

        res.status(200).json(blog)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}


const likeUnlikeBlog = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        const userLikesBlog = blog.likes.includes(userId)

        if (userLikesBlog) {
            //unlike Blog
            await blog.updateOne({ $pull: { likes: userId } })
            res.status(200).json({ message: "Blog unliked successfully" });
        }
        else {
            //like blog
            blog.likes.push(userId)
            await blog.save()
            res.status(200).json({ message: "Blog liked successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

const editBlog = async (req, res) => {
    try {
        const userId = req.user._id
        const postId = req.params.id

        const blog = await Blog.findById(postId)
        const { title, content, image } = req.body

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const isAuthor = blog.authorId.toString() === userId.toString()

        if (isAuthor) {
            await Blog.findByIdAndUpdate(postId, { title, content, image })
            res.status(200).json({ message: "Blog updated successfully" });
        }
        else {
            return res.status(400).json({ error: "You are not authorized to edit this blog" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export { createBlog, getAllBlogs, getBlogInfo, likeUnlikeBlog, editBlog }