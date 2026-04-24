import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, currUser } = useAuth();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const validUser = await login(email, password);

      if (validUser) {
        navigate("/home");
      } else {
        alert("Invalid Details");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (currUser) {
      navigate("/home");
      return;
    }
  }, [currUser]);

  return (
    <div>
      <div className="bg-white p-7 rounded-xl w-125 my-7.5 mx-auto text-center">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full p-2.5 bg-[#4f46e5] text-white border-0 rounded-lg cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
        <Link
          to="/signup"
          className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default Login;
