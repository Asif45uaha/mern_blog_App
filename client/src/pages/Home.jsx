import { useEffect, useState } from "react"
import axios from 'axios'
import { Image, Button, Link } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate()

    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await axios.get("http://localhost:8000/api/blogs/getall", {
                withCredentials: true,
                baseURL: "http://localhost:8000",
                credentials: "include"
            })
            setBlogs(res?.data)
        }
        fetchBlogs()
    }, [])
    const formatDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} At ${d.getHours()}:${d.getMinutes()}`
    }
    console.log(blogs);

    return (
        <div className="max-w-screen-lg px-0 md:px-6 mx-auto">
            <div className="flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-center">Featured Blogs</h2>
                {
                    blogs.length === 0 && <div className="flex justify-center">No blogs found</div>
                }
                <div className="overflow-y-scroll h-screen md:py-4">
                    {blogs.map((item, id) => {
                        return (
                            <div key={id} className=" flex flex-col gap-4 px-4  md:flex-row items-center justify-center shadow-md shadow-gray-300 rounded-lg p-4 ">
                                <div className="flex-[0.3] ">
                                    <Image src={item?.image} alt="error" className="object-cover " />
                                </div>
                                <div className="flex flex-col gap-2 justify-start items-start flex-[0.7]">
                                    <div className="flex flex-col w-full">
                                        <div>
                                            <h2>{item?.title}</h2>
                                        </div>
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <h2>@{item?.authorName}</h2>
                                            <h2>{formatDate(item?.createdAt)}</h2>
                                        </div>

                                    </div>
                                    <p className="text-xs">{item?.content.slice(0, 400)}..</p>
                                    <Button color="primary" onClick={() => navigate(`/${item?._id}`)}>Know More...</Button>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Home