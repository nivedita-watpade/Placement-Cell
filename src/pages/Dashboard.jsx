import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { useJob } from "../context/JobContext";

function Dashboard() {
  const { jobs, appliedJobs } = useJob();
  const { currUser } = useAuth();

  const yoursJob = jobs.filter((job) => job.user_id === currUser.id);

  const appliedJobsNum = appliedJobs.filter(
    (job) => job.student_id === currUser.id,
  );

  const shortlistedJob = appliedJobsNum.filter(
    (job) => job.status === "Shortlisted",
  );

  const rejectedJob = appliedJobsNum.filter((job) => job.status === "Rejected");

  return (
    <section className="p-10 bg-[#eef2ff]">
      <h2>Your Dashboard</h2>
      <div className="flex gap-5 flex-wrap">
        {currUser.role === "teacher" && (
          <>
            <StatCard title="Total Jobs" count={jobs.length} />
            <StatCard title="Yours Jobs" count={yoursJob.length} />
          </>
        )}

        {currUser.role === "student" && (
          <>
            <Link
              to="/applied-job-list/Applied"
              className="flex-1 min-w-48 bg-white p-5 rounded-xl text-center"
            >
              <StatCard title="Applied Jobs" count={appliedJobsNum.length} />
            </Link>
            <Link
              to="/applied-job-list/Shortlisted"
              className="flex-1 min-w-48 bg-white p-5 rounded-xl text-center"
            >
              <StatCard
                title="Shortlisted Jobs"
                count={shortlistedJob.length}
              />
            </Link>
            <Link
              to="/applied-job-list/Rejected"
              className="flex-1 min-w-48 bg-white p-5 rounded-xl text-center"
            >
              <StatCard title="Rejected Jobs" count={rejectedJob.length} />
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
