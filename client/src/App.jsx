import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'; 

import LandingPage from "./pages/LandingPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { Toaster } from "sonner";
import MemberManagementPage from "./pages/MemberManagement/MemberManagementPage.jsx";

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
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
