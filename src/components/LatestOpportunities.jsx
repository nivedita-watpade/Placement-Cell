import { useJob } from "../context/JobContext";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";

function LatestOpportunities() {
  const { jobs } = useJob();
  return (
    <section className="p-10">
      <h2>Latest Opportunities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {jobs.slice(0, 4).map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>

      <div className="text-center">
        <Link
          to="/jobs"
          className="w-50 my-7 inline-block mx-auto p-2.5 bg-[#4f46e5] text-white border-0 rounded-lg cursor-pointer"
        >
          View More Jobs
        </Link>
      </div>
    </section>
  );
}

export default LatestOpportunities;
