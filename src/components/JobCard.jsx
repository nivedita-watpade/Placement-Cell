import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJob } from "../context/JobContext";
import { useState } from "react";
import { useStudentProfile } from "../context/StudentProfileContext";

function JobCard({ job }) {
  const { currUser } = useAuth();
  const { studentProfile } = useStudentProfile();
  const [show, setShow] = useState(false);

  const { appliedJobs, handleJobApply, handleDeleteJobPost } = useJob();
  const { role, company_name, salary_package, job_description } = job;

  const navigate = useNavigate();

  const alreadyApplied = appliedJobs.some(
    (appliedJob) =>
      appliedJob.job_id === job.id && appliedJob.student_id === currUser.id,
  );

  async function onJobApply() {
    try {
      if (!studentProfile || studentProfile.length === 0) {
        alert("Please create your profile first to continue.");
        navigate("/student-profile");
        return;
      }
      await handleJobApply(job.id);
    } catch (err) {
      console.log(err);
    }
  }

  async function onDeletePost(id) {
    try {
      await handleDeleteJobPost(id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{role}</h3>
            <p className="text-sm text-gray-500 mt-1">🏢 {company_name}</p>
          </div>

          {job.user_id === currUser.id && (
            <button
              onClick={() => onDeletePost(job.id)}
              className="text-gray-400 hover:text-red-500 text-lg transition"
              title="Delete Job"
            >
              🗑️
            </button>
          )}
        </div>

        <div className="mt-3">
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-medium">
            💰 ₹ {salary_package}
          </span>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className={`text-sm text-gray-600 ${show ? "" : "line-clamp-2"}`}>
            {job_description}
          </p>

          <button
            onClick={() => setShow(!show)}
            className="text-indigo-600 text-sm mt-1 hover:underline"
          >
            {show ? "View less" : "View more"}
          </button>
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-between items-center">
          {/* Student Actions */}
          {currUser.role === "student" && (
            <button
              onClick={onJobApply}
              disabled={alreadyApplied}
              className={`px-4 py-2 text-sm rounded-lg font-medium text-white transition 
        ${
          alreadyApplied
            ? "bg-green-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
            >
              {alreadyApplied ? "Applied ✓" : "Apply Now"}
            </button>
          )}

          {/* Teacher Actions */}
          {currUser.role === "teacher" && (
            <div className="flex gap-4 text-sm">
              <Link
                to={`/view-applicants/${job.id}`}
                className="text-indigo-600 hover:underline"
              >
                View
              </Link>

              {job.user_id === currUser.id && (
                <Link
                  to={`/update-job/${job.id}`}
                  className="text-gray-600 hover:text-indigo-600 hover:underline"
                >
                  Edit
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <div className="bg-white p-5 rounded-xl shadow-[0_4px_10px_rgba(0, 0, 0, 0.05)] transition-[0.2s] hover:-translate-y-1 ">
        <div className="flex items-center justify-between">
          <h3>{role}</h3>
          {job.user_id === currUser.id && (
            <span
              onClick={() => onDeletePost(job.id)}
              className="font-bold text-lg cursor-pointer"
            >
              🗑️
            </span>
          )}
        </div>
        <p>Company: {company_name}</p>
        <p>Package: ₹ {salary_package}</p>

        <div className="flex">
          <p className={show ? "expanded" : "collapsed"}>
            Description: {job_description}
          </p>
          <span
            onClick={() => setShow(!show)}
            className="inline-block text-[#4f46e5] cursor-pointer"
          >
            {show ? "View less" : "View more"}
          </span>
        </div>

        {currUser.role === "student" && (
          <button
            onClick={onJobApply}
            disabled={alreadyApplied}
            className={`inline-block py-2 px-4  text-white rounded-lg cursor-pointer mt-2 ${alreadyApplied ? "bg-green-700" : "bg-blue-800"} disabled:cursor-no-drop`}
          >
            {alreadyApplied ? "Applied" : "Apply"}
          </button>
        )}

        {currUser.role === "teacher" && (
          <div className="flex gap-3">
            <Link
              to={`/view-applicants/${job.id}`}
              className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
            >
              View
            </Link>
            {job.user_id === currUser.id && (
              <Link
                to={`/update-job/${job.id}`}
                className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
              >
                Edit
              </Link>
            )}
          </div>
        )}
      </div> */}
    </>
  );
}

export default JobCard;
