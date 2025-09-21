import { useAuth } from "@/context/authentication";

export function AdminRoute ({ children }) {
  const { isAuthenticated, isAdmin, state,  state: { getUserLoading } } = useAuth(); 
  const isActualLoading = isLoading === null || isLoading;

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
