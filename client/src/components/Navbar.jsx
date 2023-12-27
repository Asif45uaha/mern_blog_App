import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext";
import axios from 'axios'
import Cookies from 'js-cookie'
const NavbarComponent = () => {
    const { user, setUser } = UserAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            if (offset > 0) {
                setIsSticky(true)
            }
            else {
                setIsSticky(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
    }, [])
    const handleLogout = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/users/logout", {
                withCredentials: true,
                baseURL: "http://localhost:8000",
                credentials: "include",
            })
            Cookies.remove("jwt")
            if (res.status === 200) {
                localStorage.removeItem("user")
                setUser(null)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className={`${isSticky ? "shadow-md shadow-gray-300" : "shadow-none "}`}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" className="text-inherit">
                        <p className="font-bold text-inherit md:text-2xl text-lg"><span className="text-primary">B</span>log</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            {
                user ? (
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex cursor-pointer">
                            <Link onClick={() => navigate("/write")}>Write</Link>
                        </NavbarItem>
                        <NavbarItem className="hidden lg:flex cursor-pointer">
                            <Link onClick={() => navigate("/profile")}>Profile</Link>
                        </NavbarItem>
                        <NavbarItem className="hidden lg:flex">
                            <Button onClick={handleLogout} as={Link} color="primary" href="#" variant="flat">
                                Logout
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                ) : (
                    <NavbarContent justify="end">

                        <NavbarItem className="hidden lg:flex">
                            <Link onClick={() => navigate("/login")}>Login</Link>
                        </NavbarItem>
                        <NavbarItem className="hidden lg:flex">
                            <Button onClick={() => navigate("/signup")} as={Link} color="primary" href="#" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                )
            }
            {
                user ? <NavbarMenu className="z-[50]">
                    <NavbarMenuItem>
                        <Link
                            href="/Write"
                            size="lg"
                        >
                            Write
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link
                            href="/profile"
                            size="lg"
                        >
                            Profile
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link
                            onClick={handleLogout}
                            size="lg"
                            color="primary"
                        >
                            Logout
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenu> :

                    <NavbarMenu className="z-[50]">

                        <NavbarMenuItem>
                            <Link
                                href="/login"
                                size="lg"
                            >
                                Login
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link

                                size="lg"
                                color="primary"
                                href="/signup"
                            >
                                Signup
                            </Link>
                        </NavbarMenuItem>
                    </NavbarMenu>
            }


        </Navbar>
    );
}


export default NavbarComponent