import { useEffect, useState } from "react";
import { useJob } from "../context/JobContext";
import { Link, useParams } from "react-router-dom";
import supabase from "../config/supabase";
import { exportToExcel } from "../utils/exportToExcel";
import NoDataFoundMsg from "../components/NoDataFoundMsg";
// import { useStudentProfile } from "../context/StudentProfileContext";

function ViewApplicants() {
  const { applicants, fetchApplicantsData } = useJob();
  const [jobStatus, setJobStatus] = useState("");
  const { id } = useParams();

  // const { studentProfile } = useStudentProfile();

  useEffect(() => {
    fetchApplicantsData(id);
  }, [id]);

  async function handleUpdateApplicants(applicantId) {
    const { data } = await supabase
      .from("JOBSAPPLIED")
      .update({ status: jobStatus })
      .eq("id", applicantId)
      .select();

    console.log("Updated Data", data);
  }

  function exportApplicantsDataExcel() {
    const formattedData = applicants.map((applicant) => ({
      Name: applicant.USERS?.full_name,
      Company: applicant.JOBPOSTS?.company_name,
      Role: applicant.JOBPOSTS?.role,
      Status: applicant.status || "Pending",
    }));

    exportToExcel(formattedData);
  }

  if (!applicants || !applicants.length) return <NoDataFoundMsg />;

  return (
    <div className="bg-white p-7 rounded-xl w-5xl my-7.5 mx-auto text-center">
      <h2 className="mb-5 flex items-center justify-between">
        <span>Company : {applicants[0]?.JOBPOSTS?.company_name}</span>
        <span>Role: {applicants[0]?.JOBPOSTS?.role}</span>
      </h2>
      <hr className="my-5 text-[#e8e8e8]" />
      <div className="flex items-center justify-end mb-5">
        <button
          onClick={exportApplicantsDataExcel}
          className="inline-block py-1 px-4  text-white rounded-lg cursor-pointer bg-green-700"
        >
          Export Exls
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Profile</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => {
            return (
              <tr key={applicant.id}>
                <td className="border p-1">{applicant.USERS.full_name}</td>
                <td className="border p-1">
                  <Link
                    to={`/student-profile/${applicant.student_id}`}
                    className="text-blue-700 underline"
                  >
                    View Profile
                  </Link>
                </td>
                <td className="border p-1 flex gap-4">
                  <select
                    className="w-40 p-1 rounded-md border border-[#858585] outline-0"
                    value={jobStatus || ""}
                    onChange={(e) => setJobStatus(e.target.value)}
                  >
                    {!applicant.status && (
                      <option value="Applied">Update Status</option>
                    )}
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => {
                      console.log(applicant.id);
                      handleUpdateApplicants(applicant.id);
                    }}
                    disabled={!jobStatus}
                    className={`inline-block py-1 px-4 text-white rounded-lg bg-green-700 ${
                      !jobStatus
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100"
                    }`}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApplicants;
