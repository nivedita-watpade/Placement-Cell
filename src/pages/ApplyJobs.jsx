import { Link } from "react-router-dom";

function ApplyJobs() {
  return (
    <div className="bg-white p-7 rounded-xl w-3xl my-7.5 mx-auto text-center">
      <h2 className="mb-5">Apply for Job</h2>

      <form>
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="tel"
          placeholder="Phone Number"
        />
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="file"
        />

        <button
          className="w-full p-2.5 bg-[#4f46e5] text-white border-0 rounded-lg cursor-pointer"
          type="submit"
        >
          Submit Application
        </button>
      </form>

      <Link
        to="/jobs"
        className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
      >
        Cancel
      </Link>
    </div>
  );
}

export default ApplyJobs;
