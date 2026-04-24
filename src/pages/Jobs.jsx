import { useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import { useJob } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";

function Jobs() {
  const { currUser } = useAuth();
  const { jobs } = useJob();
  const jobsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPage = currentPage * jobsPerPage;
  const indexOfFirstPage = indexOfLastPage - jobsPerPage;

  const currentJobs = jobs.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <section className="p-10">
      <h2 className="mb-4">Latest Opportunities</h2>

      {currUser.role === "teacher" && (
        <div className="my-4">
          <Link
            to="/create-job"
            className="inline-block py-2 px-4 bg-blue-800 text-white rounded-lg cursor-pointer mt-2"
          >
            Create Job Post
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {currentJobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
      <Pagination
        totalItems={jobs.length}
        jobsPerPage={jobsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}

export default Jobs;
