import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useReducer, useEffect, useMemo } from "react";

const initialState = {
  role: "",
  companyName: "",
  jobPackage: "",
  description: "",
};

function reducer(state, action) {
  const { type, field, value, payload } = action;

  if (type === "UPDATE_FIELD") {
    return {
      ...state,
      [field]: value,
    };
  }

  if (type === "EDIT_FIELDS") {
    return {
      ...state,
      ...payload,
    };
  }

  if (type === "RESET") {
    return initialState;
  }
  return state;
}

function CreateJob() {
  const { jobs, handleCreateJobs, handleUpdateJobPost } = useJob();
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { role, companyName, jobPackage, description } = state;

  const job = useMemo(() => {
    return jobs.find((job) => job.id === Number(id));
  }, [jobs, id]);

  const url = useLocation();
  const isEdit = url.pathname.includes("update-job");
  // console.log("url", url.pathname.includes("update-job"));

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  useEffect(() => {
    if (job) {
      dispatch({
        type: "EDIT_FIELDS",
        payload: {
          role: job.role || "",
          companyName: job.company_name || "",
          jobPackage: job.salary_package || "",
          description: job.job_description || "",
        },
      });
    }
  }, [job]);

  async function onCreateJob(e) {
    e.preventDefault();

    if (!state.role || !state.companyName || !state.jobPackage) {
      alert("Enter fields ");
      return;
    }

    try {
      await handleCreateJobs(state);
      dispatch({ type: "RESET" });
      navigate("/jobs");
    } catch (err) {
      console.log(err);
    }
  }

  async function onUpdateJobs(e) {
    e.preventDefault();
    try {
      await handleUpdateJobPost(job.id, state);
      dispatch({ type: "RESET" });
      navigate("/jobs");
    } catch (err) {
      console.log(err);
    }
  }

  // const { role, company_name, salary_package, job_description };

  return (
    <div className="bg-white p-7 rounded-xl w-3xl my-7.5 mx-auto text-center">
      <h2 className="mb-5">{isEdit ? "Update Job" : "Create Job"}</h2>

      <form onSubmit={isEdit ? onUpdateJobs : onCreateJob}>
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="text"
          placeholder="Role"
          name="role"
          value={role}
          onChange={handleChange}
        />
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={companyName}
          onChange={handleChange}
        />
        <input
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          type="text"
          placeholder="Package"
          name="jobPackage"
          value={jobPackage}
          onChange={handleChange}
        />
        <textarea
          className="w-full p-2.5 mb-3 rounded-md border border-[#ddd] outline-0"
          rows={4}
          placeholder="Job Description"
          name="description"
          value={description}
          onChange={handleChange}
        />

        <button
          className="w-full p-2.5 bg-[#4f46e5] text-white border-0 rounded-lg cursor-pointer"
          type="submit"
        >
          {isEdit ? "Update Application" : "Submit Application"}
        </button>
      </form>

      <Link
        to="/jobs"
        className="inline-block mt-2.5 text-[#4f46e5] cursor-pointer"
      >
        Cancel
      </Link>
    </div>
  );
}

export default CreateJob;
