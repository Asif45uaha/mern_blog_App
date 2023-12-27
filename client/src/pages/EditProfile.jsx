import { useEffect, useState } from "react"
import { Input, Button, Image } from "@nextui-org/react"
import axios from 'axios'
import { UserAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
const EditProfile = () => {
    const navigate = useNavigate()
    const { user } = UserAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const handleImageChange = (ev) => {
        const file = ev.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePic(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }
    useEffect(() => {
        const getprofile = async () => {
            const res = await axios.get(`http://localhost:8000/api/users/getprofile/${user._id}`, {
                withCredentials: true,
                baseURL: "http://localhost:8000",
            })
            console.log(res?.data);
            setName(res?.data?.name)
            setEmail(res?.data?.email)
            setPassword(res?.data?.password)
            setProfilePic(res?.data?.profile)
        }
        getprofile()
    }, [])
    const uploadProfile = async (ev) => {
        ev.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8000/api/users/update/${user._id}`, {
                name,
                email,
                password,
                profile: profilePic
            }, {
                withCredentials: true,
                baseURL: "http://localhost:8000",
            })
            if (res?.status === 200) {
                alert("Profile Updated")
                navigate('/profile')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="max-w-screen-lg px-2 md:px-6 mx-auto overflow-y-scroll">
            <form onSubmit={uploadProfile} className=" flex flex-col justify-center gap-4 max-w-lg mx-auto shadow-md p-4 rounded-2xl h-[120vh]">

                <h2 className="font-bold text-lg md:text-xl text-center">Edit Profile Pic</h2>
                <Input value={name} onChange={e => setName(e.target.value)} type="text" label="Name" />
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" label="Email" />
                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" label="Password" />
                <Input type="file" onChange={handleImageChange} />
                <Button type="submit" color="primary">
                    Update
                </Button>

            </form>
        </div>
    )
}
export default EditProfile