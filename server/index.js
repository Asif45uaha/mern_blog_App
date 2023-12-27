import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'
import connectToDB from './config/db.js'
import userRoutes from './routes/user.js'
import blogRoutes from "./routes/blog.js"


dotenv.config()
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))

app.use(cookieParser())

const port = process.env.PORT

//cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//database connection
connectToDB()

//routes
app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)


app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`))