import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currUser, handleLogout } = useAuth();

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

        <div className="relative inline-block group ml-5">
          <label htmlFor="login-toggle" className="cursor-pointer">
            {currUser?.full_name}
          </label>

          <div className="absolute hidden -left-5 top-[15px] group-hover:block bg-white shadow-md mt-2 rounded">
            {currUser.role === "student" && (
              <Link
                to="student-profile"
                className="block text-[#4f46e5] px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 w-full text-left"
              >
                Profile
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="block text-[#4f46e5] px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
