import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Image, Button } from '@nextui-org/react'
const BlogDetail = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchBlogInfo = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/blogs/get/${id}`, {
                    withCredentials: true,
                    baseURL: "http://localhost:8000",
                    credentials: "include"
                })
                setData(res?.data)
                console.log(res?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBlogInfo()
    }, [])
    const formatDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} At ${d.getHours()}:${d.getMinutes()}`
    }
    const getCategory = (val) => {
        if (val === "0") {
            return "Technology"
        }
        else if (val === "1") {
            return "Music"
        }
        else if (val === "2") {
            return "Business"
        }
        else if (val === "3") {
            return "Finance"
        }
        else if (val === "4") {
            return "Film Industry"
        }
        else if (val === "5") {
            return "Sports"
        }
        else if (val === "6") {
            return "HealthCare"
        }
        else if (val === "7") {
            return "Fitness"
        }
        else {
            return "IT&Programming"
        }
    }
    return (
        <div className="max-w-screen-lg px-0 md:px-6 mx-auto ">
            <div className='flex flex-row gap-2 items-center justify-end overflow-hidden'>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>
            <div className='flex flex-col justify-center items-center mt-2 gap-4 h-screen overflow-y-scroll'>
                <p className='font-bold text-primary'>{getCategory(data?.category)}</p>
                <Image src={data?.image} className='object-cover mx-auto' />
                <h2 className='font-bold text-xl'>{data?.title}</h2>
                <div className=' flex flex-row justify-between items-center w-full'>
                    <h2 className='font-bold text-md'>By : @{data?.authorName}</h2>
                    <h2 className='font-normal text-sm'>Date : {formatDate(data?.createdAt)}</h2>
                </div>
                <p className='text-sm md:text-lg'>{data?.content}</p>
            </div>
        </div>
    )
}
export default BlogDetail