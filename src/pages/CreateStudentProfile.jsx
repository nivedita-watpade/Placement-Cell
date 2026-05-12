import { useEffect, useReducer } from "react";
import { useStudentProfile } from "../context/StudentProfileContext";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  profileImage: "",
  role: "",
  location: "",
  contact: "",
  about: "",
  skills: [],
  educations: [],
  resume: "",
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

function CreateStudentProfile() {
  const { handleCreateProfile, studentProfile, handleUpdateProfile } =
    useStudentProfile();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  function handleFileChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.files[0],
    });
  }

  async function onCreateProfile(e) {
    e.preventDefault();
    try {
      const formattedData = {
        ...state,
        skills: state.skills,
        educations: state.educations,
        resume_ref: state.resume_ref,
        profile_image_ref: state.profile_image_ref,
      };

      if (isEdit) {
        await handleUpdateProfile(id, formattedData);
        alert("Profile updated successfully!");
      } else {
        await handleCreateProfile(formattedData);
        alert("Created profile successfully!");
      }

      navigate(`/student-profile/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isEdit && studentProfile?.length > 0) {
      const data = studentProfile[0];
      if (!data) return;

      const updateFields = (fields) => {
        Object.entries(fields).forEach(([field, value]) => {
          dispatch({
            type: "UPDATE_FIELD",
            field,
            value: value || "",
          });
        });
      };

      updateFields({
        role: data.role,
        location: data.location,
        contact: data.contact,
        about: data.about,
        skills: data.skills?.join(",") || [],
        educations: data.educations?.join(",") || [],
        profileImage: data.profile_image_ref,
        resume: data.resume_ref,
      });
    }
  }, [isEdit, studentProfile]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEdit ? "Update Profile" : "Create Profile"}
        </h2>

        <form className="space-y-5" onSubmit={onCreateProfile}>
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-indigo-600 cursor-pointer">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="role"
              value={state.role}
              placeholder="Role"
              className="border p-2 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              value={state.location}
              placeholder="Location"
              className="border p-2 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="text"
              name="contact"
              value={state.contact}
              placeholder="Phone"
              className="border p-2 rounded-lg "
              onChange={handleChange}
            />
          </div>

          {/* About */}
          <textarea
            placeholder="About"
            rows="3"
            name="about"
            value={state.about}
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
          ></textarea>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            value={state.skills}
            placeholder="Skills (comma separated)"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
          />

          {/* Education */}
          <input
            type="text"
            name="educations"
            value={state.educations}
            placeholder="Education"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
          />

          {/* Resume */}
          <div>
            <label className="bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf"
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudentProfile;
