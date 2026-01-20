import { Link } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Social-Media App</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        {userId && <Link to={`/profile/${userId}`}>Profile</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
