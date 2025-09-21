import { useAuth } from "@/context/authentication";
import { Navigate } from "react-router-dom";

export function AdminRoute ({ children }) {
  const { isAuthenticated, isAdmin, state,  state: { getUserLoading } } = useAuth(); 
  const isActualLoading = getUserLoading === null || getUserLoading;

  if (isActualLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if(isAdmin) {
    return children;
  }

  return <Navigate to="/" replace />;
}
