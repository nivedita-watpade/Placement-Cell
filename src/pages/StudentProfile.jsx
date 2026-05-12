import { Link, useParams } from "react-router-dom";
import { useStudentProfile } from "../context/StudentProfileContext";
import CreateStudentProfile from "./CreateStudentProfile";
import { useAuth } from "../context/AuthContext";
import { useEffect, useMemo } from "react";
import { useJob } from "../context/JobContext";
import supabase from "../config/supabase";

function StudentProfile() {
  const { studentProfile, isLoading, setStudentProfile, setIsLoading } =
    useStudentProfile();
  const { currUser } = useAuth();
  const { jobs, appliedJobs } = useJob();
  const studentInfo = studentProfile[0];
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    try {
      async function fetchStudentProfile() {
        const { data, error } = await supabase
          .from("STUDENTPROFILES")
          .select(
            `
    *,
    USERS (
      full_name,
      email
    )
  `,
          )
          .eq("student_id", Number(id));

        if (error) throw new Error(error.message);

        setStudentProfile(data);

        setIsLoading(false);
      }
      fetchStudentProfile();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const allAppliedJobs = useMemo(
    function () {
      return appliedJobs
        .filter((job) => job.student_id === currUser.id)
        .map((job) => {
          const appliedJob = jobs.find((x) => x.id === job.job_id);
          return { ...appliedJob, status: job.status };
        });
    },
    [currUser.id, appliedJobs, jobs],
  );

  const handleDownload = async () => {
    try {
      const response = await fetch(studentInfo.resume_ref);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "Resume.pdf"; // name of file

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  if (isLoading)
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );

  if (!studentProfile || studentProfile.length === 0)
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <Link
          to="/create-student-profile"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Create Profile
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-b pb-6">
          <img
            src={
              studentInfo.profile_image_ref ||
              `https://cdn.pixabay.com/photo/2026/03/08/20/07/doodleplaystudio-wall-art-10162713_1280.jpg`
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-2"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              {currUser.role === "student"
                ? currUser.full_name
                : studentInfo.USERS.full_name}
            </h2>
            <p className="text-gray-500">{studentInfo.role}</p>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span>📍 {studentInfo.location}</span>
              <span>
                📧
                {currUser.role === "student"
                  ? currUser.email
                  : studentInfo.USERS.email}
              </span>
              <span>📞 +91 {studentInfo.contact}</span>
            </div>
          </div>

          {currUser.role === "student" && (
            <Link
              to={`/edit-student-profile/${studentInfo.student_id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Edit Profile
            </Link>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-600 text-sm">{studentInfo.about}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {studentInfo.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Education
          </h3>
          {studentInfo.educations.map((education) => (
            <p key={education} className="text-gray-600 text-sm">
              {education}
            </p>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Resume</h3>
            <p className="text-gray-500 text-sm">
              {/* <a
                href={studentInfo.resume_ref}
                className="text-indigo-600"
                download="Resume.pdf"
              >
                Download Resume
              </a> */}
              <button
                onClick={handleDownload}
                className="text-indigo-600 cursor-pointer"
              >
                Download Resume
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Applied Jobs
          </h3>

          <div className="space-y-3">
            {allAppliedJobs.map((applyJob) => (
              <div
                key={applyJob.id}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:shadow transition"
              >
                <div>
                  <p className="font-medium text-gray-800 text-re">
                    {applyJob.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {applyJob.company_name} • ₹ {applyJob.salary_package}
                  </p>
                </div>
                <span
                  className={`text-${applyJob.status === "Shortlisted" ? "green" : "yellow"}-600 text-sm font-medium`}
                >
                  {applyJob.status ? applyJob.status : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
