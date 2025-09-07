import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostsContext } from "./contexts/PostsContext.jsx";
import { fetchPosts } from "./api/posts.js";

import LandingPage from "./pages/LandingPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

function App() {

  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/post/:id' element={<ViewPostPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
