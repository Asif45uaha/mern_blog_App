import { Input, Textarea, Image, Button } from "@nextui-org/react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Select, SelectItem } from "@nextui-org/react";
const WriteBlog = () => {
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryVal, setCategoryVal] = useState(0)
    const handleImageChange = async (ev) => {
        const file = ev.target.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }
    const createBlog = async (ev) => {
        ev.preventDefault()
        try {
            await axios.post("http://localhost:8000/api/blogs/create", {
                title, content, image: imgUrl, category: categoryVal
            }, {
                withCredentials: true,
                baseURL: "http://localhost:8000",
                credentials: "include",
            })
            navigate("/")

        } catch (error) {
            console.log(error);
        }
    }
    const categories = [
        {
            id: 1,
            value: 1,
            label: "Technology"
        },
        {
            id: 2,
            value: 2,
            label: "Music"
        },
        {
            id: 3,
            value: 3,
            label: "Business"
        },
        {
            id: 4,
            value: 4,
            label: "Finance"
        },
        {
            id: 5,
            value: 5,
            label: "Film Industry"
        },
        {
            id: 6,
            value: 6,
            label: "Sports"
        },
        {
            id: 7,
            value: 7,
            label: "HealthCare"
        },
        {
            id: 8,
            value: 8,
            label: "Fitness"
        },
        {
            id: 9,
            value: 9,
            label: "IT&Programming"
        }

    ]
    return (
        <div className="max-w-screen-lg px-2 md:px-6 mx-auto ">
            <form onSubmit={createBlog} className="flex flex-col gap-4 max-w-screen-md mx-auto h-screen  justify-center shadow-md shadow-gray-300 rounded-lg p-4">
                <h2 className="font-bold md:text-xl text-lg text-center">Write Blog</h2>
                <Input value={title} onChange={(ev) => setTitle(ev.target.value)} label="title" />
                <Textarea value={content} onChange={(ev) => setContent(ev.target.value)} label="description" />
                <Input onChange={handleImageChange} type="file" />
                <Select
                    label="Select Category"
                    onChange={(e) => setCategoryVal(e.target.value)}
                >
                    {categories.map((item, id) => (
                        <SelectItem key={id} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="submit" color="primary">Submit</Button>
            </form>
        </div>
    )
}
export default WriteBlog