import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JobProvider } from "../context/JobContext";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AppLayout from "./AppLayout";
import Jobs from "../pages/Jobs";
import ApplyJobs from "../pages/ApplyJobs";
import CreateJob from "../pages/CreateJob";
import ViewApplicants from "../pages/ViewApplicants";

function Main() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <>
              <Route path="/" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </>

            <Route
              element={
                <ProtectedRoute>
                  <JobProvider>
                    <AppLayout />
                  </JobProvider>
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/jobs" element={<Jobs />}></Route>
              <Route path="/apply-jobs" element={<ApplyJobs />}></Route>
              <Route path="/create-job" element={<CreateJob />}></Route>
              <Route
                path="/view-applicants/:id"
                element={<ViewApplicants />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default Main;
