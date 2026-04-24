import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/supabase";
import { useAuth } from "./AuthContext";

const JobContext = createContext();

function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const { currUser } = useAuth();

  useEffect(() => {
    // Fetch  Jobs Data
    const fetchJobs = async () => {
      const { data, error } = await supabase.from("JOBPOSTS").select("*");

      if (!error) setJobs(data);
    };
    fetchJobs();

    // Fetch Applied Jobs Data
    const fetchAppliedJobs = async () => {
      const { data, error } = await supabase.from("JOBSAPPLIED").select("*");

      if (!error) setAppliedJobs(data);
    };
    fetchAppliedJobs();
  }, []);

  async function handleCreateJobs(state) {
    const { role, companyName, jobPackage, description } = state;

    const { error, data } = await supabase
      .from("JOBPOSTS")
      .insert([
        {
          role,
          user_id: currUser.id,
          company_name: companyName,
          salary_package: jobPackage,
          job_description: description,
        },
      ])
      .select();

    setJobs((prev) => [...data, ...prev]);

    if (error) throw new Error(error.message);

    alert("You have created job successfully.");
  }

  async function handleJobApply(jobId) {
    console.log(jobId);
    const { error, data } = await supabase
      .from("JOBSAPPLIED")
      .insert([{ job_id: jobId, student_id: currUser.id }])
      .select();

    setAppliedJobs((prev) => [...prev, ...data]);

    if (error) throw new Error(error.message);

    alert("You have applied successfully.");
  }

  async function handleDeleteJobPost(jobId) {
    const { data, error } = await supabase
      .from("JOBPOSTS")
      .delete()
      .eq("id", jobId);

    console.log(data);

    setJobs((prevJobs) => prevJobs.filter((prevJob) => prevJob.id !== jobId));

    if (error) throw new Error(error.message);

    alert("You have deleted job post successfully.");
  }

  async function fetchApplicantsData(jobId) {
    const { data, error } = await supabase
      .from("JOBSAPPLIED")
      .select(
        ` id,
  status,
  USERS (full_name, email),
  JOBPOSTS (role, company_name)
`,
      )
      .eq("job_id", jobId);

    setApplicants(data);
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        appliedJobs,
        applicants,
        fetchApplicantsData,
        handleCreateJobs,
        handleJobApply,
        handleDeleteJobPost,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

function useJob() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("AuthContext is used outside of the Provider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { JobProvider, useJob };
