import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import ViewPostPage from "./pages/ViewPostPage.jsx";

function App() {

  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/post/:postId' element={<ViewPostPage />}/>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
