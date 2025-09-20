import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'; 

import LandingPage from "./pages/LandingPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { Toaster } from "sonner";
import MemberManagementPage from "./pages/MemberManagement/MemberManagementPage.jsx";

// Admin
import AdminDashboard from "./pages/ArticleManagement/AdminDashboard";
import CreateArticle from "./pages/ArticleManagement/AdminCreateArticle";
import EditArticle from "./pages/ArticleManagement/AdminEditArticle";
import AdminArticles from "./pages/ArticleManagement/AdminArticles";
import AdminCategories from "./pages/ArticleManagement/AdminCategories";
import AdminNotifications from "./pages/ArticleManagement/AdminNotifications";
import AdminResetPassWord from "./pages/ArticleManagement/AdminResetPassWord";
import AdminCreateArticles from "./pages/ArticleManagement/AdminCreateArticle";
import AdminEditArticle from "./pages/ArticleManagement/AdminEditArticle";
import AdminProfile from "./pages/ArticleManagement/AdminProfile";
import AdminCreateCategory from "./pages/ArticleManagement/AdminCreateCategory";
import AdminEditCategory from "./pages/ArticleManagement/AdminEditCategory";

function App() {

  return (
    <>
    <Toaster position="top-center" />
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/post/:id' element={<ViewPostPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/member' element={<MemberManagementPage />}/>
          <Route path='/admin' element={<AdminDashboard />}/>
          <Route path='/admin/article-management' element={<AdminArticles/>}/>
          <Route path='/admin/article-management/create' element={<AdminCreateArticles/>}/>
          <Route path='/admin/article-management/edit' element={<AdminEditArticle/>}/>
          <Route path='/admin/categories-management' element={<AdminCategories/>} />
          <Route path='/admin/categories-management/create' element={<AdminCreateCategory/>}/>
          <Route path='/admin/categories-management/edit' element={<AdminEditCategory/>} />
          <Route path='/admin/notifications-management' element={<AdminNotifications />} />
          <Route path='/admin/resetpassword' element={<AdminResetPassWord/>}/>
          <Route path='/admin/profile' element={<AdminProfile
            />
          }/>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
