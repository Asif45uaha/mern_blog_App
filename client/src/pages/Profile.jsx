import { useEffect, useState } from "react"
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const { user } = UserAuth()
    const [profileData, setProfileData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const getprofile = async () => {
            const res = await axios.get(`http://localhost:8000/api/users/getprofile/${user._id}`, {
                withCredentials: true,
                baseURL: "http://localhost:8000",
            })
            setProfileData(res?.data)
        }
        getprofile()
    }, [])
    // console.log(blogs);
    console.log(profileData);
    return (
        <div className="max-w-screen-lg px-0 md:px-6 mx-auto h-screen flex flex-col gap-4 overflow-y-scroll">
            <div className="py-2 flex justify-end">
                <Button color="primary" onClick={() => navigate(`/profile/${user._id}`)}>Edit Profile</Button>
            </div>
            <div className="flex flex-col  md:flex-row items-start shadow-md p-4 rounded-xl mt-4">
                {
                    profileData?.profile && <div>
                        <img src={profileData?.profile} alt="error" className="object-contain md:h-96 md:w-96" />
                    </div>
                }

                <div className="flex  flex-col ">
                    <h2 className="font-bold text-xl">{profileData?.name}</h2>
                    <p>{profileData?.email}</p>
                    <h4>Blogs : {profileData?.blogNames?.length === 0 ? 0 : profileData?.blogNames?.length}</h4>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-4 md:px-8">
                <h2 className="text-2xl font-bold">Blogs</h2>
                {
                    profileData?.blogNames?.map((blog) => {
                        return (
                            <ul key={blog} className="flex flex-col gap-2 list-disc">
                                <li className="font-bold text-md  cursor-pointer">

                                    {blog}
                                </li>
                            </ul>
                        )

                    })
                }

            </div>

        </div>
    )
}
export default Profile