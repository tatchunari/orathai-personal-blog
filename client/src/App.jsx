import { Routes, Route } from "react-router-dom";
import "./index.css";
import { useAuth } from "./context/authentication.jsx";
import { AdminRoute } from "./components/auth/AdminRoute";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import AnonUserRoute from "./components/auth/AnonUserRoute";

import LandingPage from "./pages/LandingPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import { Toaster } from "sonner";
import ResetPasswordPage from "./pages/member-management/ResetPasswordPage";
import ProfilePage from "./pages/member-management/MemberManagementPage";

// Admin
import AdminDashboard from "./pages/article-management/AdminDashboard";
import AdminArticles from "./pages/article-management/AdminArticles";
import AdminCategories from "./pages/article-management/AdminCategories";
import AdminNotifications from "./pages/article-management/AdminNotifications";
import AdminResetPassWord from "./pages/article-management/AdminResetPassWord";
import AdminCreateArticle from "./pages/article-management/AdminCreateArticle";
import AdminEditArticle from "./pages/article-management/AdminEditArticle";
import AdminProfile from "./pages/article-management/AdminProfile";
import AdminCreateCategory from "./pages/article-management/AdminCreateCategory";
import AdminEditCategory from "./pages/article-management/AdminEditCategory";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { state } = useAuth();

  // console.log(`Auth user: `, state);

  return (
    <>
      <Toaster position="top-center" />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:id" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Authentication */}
          <Route
            path="/login"
            element={
              <AnonUserRoute>
                <LoginPage />
              </AnonUserRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <AnonUserRoute>
                <SignUpPage />
              </AnonUserRoute>
            }
          />

          <Route
            path="/sign-up/success"
            element={
              <AuthenticationRoute>
                <SignUpSuccessPage />
              </AuthenticationRoute>
            }
          />

          {/* User */}
          <Route
            path="/member"
            element={
              <AuthenticationRoute>
                <ProfilePage />
              </AuthenticationRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <AuthenticationRoute>
                <ResetPasswordPage />
              </AuthenticationRoute>
            }
          />

          {/* Admin */}

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/article-management"
            element={
              <AdminRoute>
                <AdminArticles />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/article-management/create"
            element={
              <AdminRoute>
                <AdminCreateArticle />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/article-management/edit/:id"
            element={
              <AdminRoute>
                <AdminEditArticle />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category-management"
            element={
              <AdminRoute>
                <AdminCategories />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/category-management/create"
            element={
              <AdminRoute>
                <AdminCreateCategory />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/category-management/edit/:categoryId"
            element={
              <AdminRoute>
                <AdminEditCategory />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/notifications-management"
            element={<AdminNotifications />}
          />

          <Route
            path="/admin/resetpassword"
            element={
              <AdminRoute>
                <AdminResetPassWord />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
