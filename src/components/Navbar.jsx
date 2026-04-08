function Navbar() {
  return (
    <div className="flex justify-between items-center py-5 px-10 bg-[#4f46e5] text-white">
      <h1>Placement Portal</h1>
      <div class="nav-links">
        <a className="text-white ml-5 no-underline" href="#">
          Home
        </a>
        <a className="text-white ml-5 no-underline" href="#">
          Jobs
        </a>
        <a className="text-white ml-5 no-underline" href="#">
          Dashboard
        </a>
        {/* <a href="#">Login</a> */}
        <label htmlFor="login-toggle" className="ml-5 cursor-pointer">
          Login
        </label>
      </div>
    </div>
  );
}

export default Navbar;
