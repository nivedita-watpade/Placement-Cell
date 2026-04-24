import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currUser } = useAuth();

  return (
    <div className="flex justify-between items-center py-5 px-10 bg-[#4f46e5] text-white">
      <Link to="/home">
        <h1>Placement Portal</h1>
      </Link>
      <div className="nav-links">
        <Link to="/home" className="text-white ml-5 no-underline">
          Home
        </Link>
        <Link to="/jobs" className="text-white ml-5 no-underline">
          Jobs
        </Link>
        <Link to="/dashboard" className="text-white ml-5 no-underline" href="#">
          Dashboard
        </Link>

        <label htmlFor="login-toggle" className="ml-5 cursor-pointer">
          {currUser?.full_name}
        </label>
      </div>
    </div>
  );
}

export default Navbar;
