/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import LoadingScreen from "@/pages/LoadingScreen";
import { useAuth } from "@/context/authentication";

function AuthenticationRoute({ children }) {
  const { isAuthenticated, state: { getUserLoading } } = useAuth();
  if (getUserLoading === null || getUserLoading) {
    // Loading state or no data yet
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  // If not authenticated 
  return <Navigate to="/login" replace />;
}

export default AuthenticationRoute;