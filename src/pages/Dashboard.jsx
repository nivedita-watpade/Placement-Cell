import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { useJob } from "../context/JobContext";

function Dashboard() {
  const { jobs } = useJob();
  const { currUser } = useAuth();

  const yoursJob = jobs.filter((job) => job.user_id === currUser.id);
  return (
    <section className="p-10 bg-[#eef2ff]">
      <h2>Your Dashboard</h2>
      <div className="flex gap-5 flex-wrap">
        <StatCard title="Total Jobs" count={jobs.length} />
        <StatCard title="Yours Jobs" count={yoursJob.length} />
      </div>
    </section>
  );
}

export default Dashboard;
