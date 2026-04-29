import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { state, handleChange, handleRegisterUsers } = useAuth();
  const { fullName, email, password, role } = state;

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (!fullName || !email || !password || !role) {
      alert("Please enter all details");
      return;
    }

    try {
      await handleRegisterUsers();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <div className="bg-white p-7 rounded-xl w-125 my-7.5 mx-auto text-center">
        <h2 className="mb-4">Signup</h2>
        <form onSubmit={handleRegister}>
          <input
            className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <select
            name="role"
            className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
            value={role}
            onChange={handleChange}
          >
            <option>Select Role</option>
            <option value={"teacher"}>Teacher</option>
            <option value={"student"}>Student</option>
          </select>
          <button
            className="w-full p-2.5 bg-[#4f46e5] text-white border-0 rounded-lg cursor-pointer"
            type="submit"
          >
            Signup
          </button>
        </form>
        <Link
          to="/"
          className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
        >
          Already have an account
        </Link>
      </div>
    </div>
  );
}

export default Signup;
