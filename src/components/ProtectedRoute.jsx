import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { currUser } = useAuth();

  return currUser ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
