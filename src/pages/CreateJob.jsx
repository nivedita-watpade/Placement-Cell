import { Link, useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useReducer } from "react";

const initialState = {
  role: "",
  companyName: "",
  jobPackage: "",
  description: "",
};

function reducer(state, action) {
  const { type, field, value } = action;

  if (type === "UPDATE_FIELD") {
    return {
      ...state,
      [field]: value,
    };
  }
  if (type === "RESET") {
    return initialState;
  }
  return state;
}

function CreateJob() {
  const { handleCreateJobs } = useJob();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { role, companyName, jobPackage, description } = state;

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  const navigate = useNavigate();

  async function onCreateJob(e) {
    e.preventDefault();
    try {
      await handleCreateJobs(state);
      dispatch({ type: "RESET" });
      navigate("/jobs");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white p-7 rounded-xl w-3xl my-7.5 mx-auto text-center">
      <h2 className="mb-5">Create Job</h2>

      <form onSubmit={onCreateJob}>
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
          Submit Application
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
