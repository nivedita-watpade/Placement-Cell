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
            <StatCard title="Applied Jobs" count={appliedJobsNum.length} />
            <StatCard title="Shortlisted Jobs" count={shortlistedJob.length} />
            <StatCard title="Rejected Jobs" count={rejectedJob.length} />
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
