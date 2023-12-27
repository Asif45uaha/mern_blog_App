import { Input, Button } from "@nextui-org/react";
import axios from 'axios'
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = UserAuth()
    const handleLogin = async (ev) => {
        ev.preventDefault()
        try {
            const res = await axios.post("http://localhost:8000/api/users/login", { email, password }, {
                withCredentials: true,
                baseURL: "http://localhost:8000"
            })
            localStorage.setItem("user", JSON.stringify(res?.data))
            setUser(res?.data)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="max-w-screen-lg px-0 md:px-6 mx-auto">
            <form onSubmit={handleLogin} className=" flex flex-col justify-center gap-4 max-w-lg mx-auto shadow-md p-4 rounded-2xl h-screen">
                <h2 className="font-bold text-lg  md:text-xl text-center">Login</h2>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" label="Email" />
                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" label="Password" />
                <Button type="submit" color="primary">
                    Submit
                </Button>
                <p>Doesn&apos;t have an account? <a href="/signup" className="underline text-primary">Signup</a></p>
            </form>
        </div>
    )
}
export default Login