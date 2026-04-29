import { createContext, useContext, useEffect, useState } from "react";
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
      phone,
      about,
      skills,
      educations,
      resume,
    } = state;

    if (
      !role ||
      !location ||
      !phone ||
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
          contact: phone,
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

  useEffect(() => {
    if (!currUser?.id) return;
    try {
      async function fetchStudentProfile() {
        const { data, error } = await supabase
          .from("STUDENTPROFILES")
          .select("*")
          .eq("student_id", Number(currUser.id));

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
  }, [currUser?.id]);

  return (
    <StudentProfileContext.Provider
      value={{
        studentProfile,

        isLoading,
        setStudentProfile,
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
