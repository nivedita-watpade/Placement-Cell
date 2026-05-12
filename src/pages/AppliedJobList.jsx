import { useState, useEffect } from "react";
import supabase from "../config/supabase";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function AppliedJobList() {
  const { currUser } = useAuth();
  const [AppliedJob, setAppliedJob] = useState([]);

  console.log(AppliedJob);

  const { status } = useParams();

  console.log(status);

  const currStudentJobs = AppliedJob.filter(
    (job) => job.student_id === currUser.id,
  ).filter((job) => job.status === status);

  console.log(currStudentJobs);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const { data, error } = await supabase
        .from("JOBSAPPLIED")
        .select(`*,  JOBPOSTS (role, company_name)`);
      // .eq("id", currUser.id);

      if (!error) setAppliedJob(data);
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div className="bg-white p-7 rounded-xl w-5xl my-7.5 mx-auto text-center">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Company Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currStudentJobs.map((currStudentJob) => (
            <tr key={currStudentJob.id}>
              <td className="border p-1">
                {currStudentJob.JOBPOSTS?.company_name}
              </td>
              <td className="border p-1">{currStudentJob.JOBPOSTS?.role}</td>
              <td className="border p-1 ">{currStudentJob.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobList;
