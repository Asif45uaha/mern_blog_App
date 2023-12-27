import express from 'express'
import { createUser, getProfileInfo, loginUser, logoutUser, updateProfile } from '../controllers/user.js'
import protectedRoute from '../middlewares/protectedRoutes.js'
const router = express.Router()


router.get("/getprofile/:id", getProfileInfo)
router.post('/register', createUser)
router.post('/login', loginUser)
router.post("/logout", logoutUser)
router.put("/update/:id", protectedRoute, updateProfile)

export default router