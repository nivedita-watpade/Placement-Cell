import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJob } from "../context/JobContext";

function JobCard({ job }) {
  const { currUser } = useAuth();
  const { appliedJobs, handleJobApply, handleDeleteJobPost } = useJob();
  const { role, company_name, salary_package } = job;

  const alreadyApplied = appliedJobs.some(
    (appliedJob) =>
      appliedJob.job_id === job.id && appliedJob.student_id === currUser.id,
  );

  async function onJobApply() {
    try {
      await handleJobApply(job.id);
    } catch (err) {
      console.log(err);
    }
  }

  async function onDeletePost(id) {
    await handleDeleteJobPost(id);
  }

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-[0_4px_10px_rgba(0, 0, 0, 0.05)] transition-[0.2s] hover:-translate-y-1 ">
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

            <Link
              to={`/create-job`}
              className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default JobCard;
