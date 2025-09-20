import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import jwtInterceptor from './utils/jwtIntercaptor'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authentication.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
