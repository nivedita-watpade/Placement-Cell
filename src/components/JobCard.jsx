function JobCard() {
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-[0_4px_10px_rgba(0, 0, 0, 0.05)] transition-[0.2s] hover:-translate-y-1 ">
        <h3>Frontend Developer</h3>
        <p>Company: Google</p>
        <p>Package: ₹12 LPA</p>
        <label
          for="apply-toggle"
          className="inline-block py-2 px-4 bg-blue-800 text-white rounded-xl cursor-pointer mt-2"
        >
          Apply
        </label>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-[0_4px_10px_rgba(0, 0, 0, 0.05)] transition-[0.2s] hover:-translate-y-1 ">
        <h3>Backend Developer</h3>
        <p>Company: Amazon</p>
        <p>Package: ₹15 LPA</p>
        <label
          for="apply-toggle"
          className="inline-block py-2 px-4 bg-blue-800 text-white rounded-xl cursor-pointer mt-2"
        >
          Apply
        </label>
      </div>
    </>
  );
}

export default JobCard;
