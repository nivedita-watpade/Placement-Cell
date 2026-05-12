import { createContext, useContext, useState } from "react";
import supabase from "../config/supabase";
import { useAuth } from "./AuthContext";

const StudentProfileContext = createContext();

function StudentProfileProvider({ children }) {
  const [studentProfile, setStudentProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currUser } = useAuth();

  async function uploadFile(file, folder) {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("Student_files")
      .upload(filePath, file);

    const { data } = await supabase.storage
      .from("Student_files")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleCreateProfile(state) {
    const {
      profileImage,
      role,
      location,
      contact,
      about,
      skills,
      educations,
      resume,
    } = state;

    if (
      !role ||
      !location ||
      !contact ||
      !about ||
      !skills ||
      !educations ||
      !resume
    ) {
      alert("Enter all details");
      return;
    }

    const student_id = currUser?.id;

    const resumeUrl = await uploadFile(resume, "Resumes");
    const profileImgUrl = profileImage
      ? await uploadFile(profileImage, "ProfileImages")
      : null;

    const { data, error } = await supabase
      .from("STUDENTPROFILES")
      .insert([
        {
          student_id,
          role,
          location,
          contact,
          about,
          skills: skills?.length ? skills.split(",") : [],
          educations: educations?.length ? educations.split(",") : [],
          resume_ref: resumeUrl,
          profile_image_ref: profileImgUrl,
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    setStudentProfile(data);
  }

  async function handleUpdateProfile(id, updatedData) {
    console.log("updatedData", updatedData);

    let resumeUrl = updatedData.resume_ref;
    let profileImgUrl = updatedData.profile_image_ref;

    if (updatedData.resume instanceof File) {
      resumeUrl = await uploadFile(updatedData.resume, "Resumes");
    }

    if (updatedData.profileImage instanceof File) {
      profileImgUrl = await uploadFile(
        updatedData.profileImage,
        "ProfileImages",
      );
    }

    const updatedValue = {
      role: updatedData.role,
      location: updatedData.location,
      contact: updatedData.contact,
      about: updatedData.about,
      skills: updatedData.skills.split(",") || [],
      educations: updatedData.educations.split(",") || [],
    };

    if (resumeUrl) {
      updatedValue.resume_ref = resumeUrl;
    }

    if (profileImgUrl) {
      updatedValue.profile_image_ref = profileImgUrl;
    }
    const { error } = await supabase
      .from("STUDENTPROFILES")
      .update(updatedValue)
      .eq("student_id", id)
      .select();

    if (error) throw new Error(error.message);
  }

  return (
    <StudentProfileContext.Provider
      value={{
        studentProfile,
        isLoading,
        handleUpdateProfile,
        setStudentProfile,
        setIsLoading,
        handleCreateProfile,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
}

function useStudentProfile() {
  const context = useContext(StudentProfileContext);
  if (context === undefined) {
    throw new Error("AuthContext is used outside of the Provider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { StudentProfileProvider, useStudentProfile };
