import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios"
const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSignup = async (ev) => {
        ev.preventDefault()
        try {
            const res = await axios.post("http://localhost:8000/api/users/register", { name, email, password }, {
                withCredentials: true,
                baseURL: "http://localhost:8000"

            })

            if (res.status === 201) {
                window.location.href = "/login"
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="max-w-screen-lg px-0 md:px-6 mx-auto">
            <form onSubmit={handleSignup} className=" flex flex-col justify-center gap-4 max-w-lg mx-auto shadow-md p-4 rounded-2xl h-screen">
                <h2 className="font-bold text-lg md:text-xl text-center">Sign Up</h2>
                <Input value={name} onChange={e => setName(e.target.value)} type="text" label="Name" />
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" label="Email" />
                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" label="Password" />
                <Button type="submit" color="primary">
                    Submit
                </Button>
                <p>Already have an account? <a href="/login" className="underline text-primary">Login</a></p>
            </form>
        </div>
    )
}
export default Signup