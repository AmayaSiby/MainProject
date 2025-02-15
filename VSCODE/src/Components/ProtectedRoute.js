import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Example: Check if navigation is coming from a button/link (session-based)
  const isNavigated = sessionStorage.getItem("navigated");

  if (!isNavigated) {
    // Redirect to home page if accessed directly
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
