import { createContext, useContext, useReducer, useState } from "react";
import supabase from "../config/supabase";

const AuthContext = createContext();

const initialState = {
  fullName: "",
  email: "",
  password: "",
  role: "",
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

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fullName, email, password, role } = state;

  const [currUser, setCurrUser] = useState(() => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  async function handleRegisterUsers() {
    const { error } = await supabase
      .from("USERS")
      .insert([{ full_name: fullName, email, password, role }]);

    if (error) throw new Error(error.message);

    alert("You have registered successfully.");

    dispatch({ type: "RESET" });
  }

  async function login(email, password) {
    const { error, data } = await supabase
      .from("USERS")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) throw new Error(error);
    if (!data || !data.length) throw new Error("Invalid Email or Password");

    setCurrUser(data[0]);
    sessionStorage.setItem("user", JSON.stringify(data[0]));

    alert("You have login successfully.");

    return data;
  }

  function handleLogout() {
    setCurrUser(null);
    sessionStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        currUser,
        state,
        login,
        handleChange,
        handleRegisterUsers,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext is used outside of the Provider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
