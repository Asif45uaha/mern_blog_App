import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const userContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    return (
        <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>
    )
}

export default AuthProvider

export const UserAuth = () => {
    return useContext(userContext)
}