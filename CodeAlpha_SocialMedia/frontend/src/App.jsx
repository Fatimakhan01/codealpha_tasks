import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
     
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/user/:id" element={<UserPosts />} />
        </Routes>

      <Footer />
    </div>
  );
}

export default App;
