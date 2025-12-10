import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // ✅ Check token expiry
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // ✅ If no token → send to roll verify
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ If token exists but expired → auto logout
  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  // ✅ Token is valid → allow access
  return children;
};

export default ProtectedRoute;
