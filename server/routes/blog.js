import express from 'express'
import { createBlog, editBlog, getAllBlogs, getBlogInfo, likeUnlikeBlog } from '../controllers/blog.js'
import protectedRoute from '../middlewares/protectedRoutes.js'
const router = express.Router()



router.get("/get/:id", protectedRoute, getBlogInfo)
router.get("/getall", getAllBlogs)
router.post("/create", protectedRoute, createBlog)
router.post("/like/:id", protectedRoute, likeUnlikeBlog)
router.put("/edit/:id", protectedRoute, editBlog)

export default router