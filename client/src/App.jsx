import { Routes, Route } from "react-router-dom";
import './index.css'; 
import { useAuth } from "./context/authentication.jsx";
import jwtInterceptor from "./utils/jwtIntercaptor";
import ProtectedRoute from "./components/auth/ProtectedRouted";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";

import LandingPage from "./pages/LandingPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import { Toaster } from "sonner";
import MemberManagementPage from "./pages/MemberManagement/MemberManagementPage.jsx";
import ResetPasswordPage from "./pages/MemberManagement/ResetPasswordPage";

// Admin
import AdminDashboard from "./pages/ArticleManagement/AdminDashboard";
import AdminArticles from "./pages/ArticleManagement/AdminArticles";
import AdminCategories from "./pages/ArticleManagement/AdminCategories";
import AdminNotifications from "./pages/ArticleManagement/AdminNotifications";
import AdminResetPassWord from "./pages/ArticleManagement/AdminResetPassWord";
import AdminCreateArticle from "./pages/ArticleManagement/AdminCreateArticle";
import AdminEditArticle from "./pages/ArticleManagement/AdminEditArticle";
import AdminProfile from "./pages/ArticleManagement/AdminProfile";
import AdminCreateCategory from "./pages/ArticleManagement/AdminCreateCategory";
import AdminEditCategory from "./pages/ArticleManagement/AdminEditCategory";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  const { isAuthenticated, state } = useAuth();

  return (
    <>
    <Toaster position="top-center" />
    <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/post/:id' element={<ViewPostPage />}/>
          <Route path='*' element={<NotFoundPage/>} />

          {/* Authentication */}
          <Route 
          path='/login' 
          element={
          <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <LoginPage />
            </AuthenticationRoute>
          }/>

          <Route 
          path='/signup' 
          element={
          <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUpPage />
            </AuthenticationRoute>
          }/>

          <Route
          path="/sign-up/success"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUpSuccessPage />
            </AuthenticationRoute>
          }
        />

        {/* User */}
          <Route 
          path='/member' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <MemberManagementPage />
            </ProtectedRoute>
          }/>

           <Route
          path="/reset-password"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Admin */}

          <Route path='/admin' element={<AdminDashboard />}/>
          <Route path='/admin/login' element={<AdminLoginPage/>}/>
          <Route 
          path='/admin/article-management' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminArticles />
            </ProtectedRoute>
          }/>

          <Route 
          path='/admin/article-management/create' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCreateArticle/>
            </ProtectedRoute>
          }/>

          <Route 
          path='/admin/article-management/edit/:Id' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminEditArticle />
            </ProtectedRoute>
          }/>
          <Route 
          path='/admin/category-management' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCategories />
            </ProtectedRoute>
          } />

          <Route 
          path='/admin/category-management/create' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCreateCategory/>
            </ProtectedRoute>
          }/>
          
          <Route 
          path='/admin/category-management/edit/:categoryId' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminEditCategory />
            </ProtectedRoute>
          } />
          
          <Route path='/admin/notifications-management' element={<AdminNotifications />} />

          <Route 
          path='/admin/resetpassword' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminResetPassWord/>
            </ProtectedRoute>
          }/>

          <Route 
          path='/admin/profile' 
          element={
          <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminProfile/>
            </ProtectedRoute>
          }/>
        </Routes>
    </div>
    </>
  )
}

export default App
