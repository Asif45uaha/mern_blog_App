import Navbar from "./components/Navbar"
import { UserAuth } from "./context/AuthContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"


import { Routes, Route, Navigate } from 'react-router-dom'
import WriteBlog from "./pages/WriteBlog"
import Footer from "./components/Footer"
import BlogDetail from "./pages/BlogDetail"
import EditProfile from "./pages/EditProfile"
function App() {
  const { user } = UserAuth()
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/:id" element={<BlogDetail />} />
        <Route path="/profile/:id" element={<EditProfile />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
