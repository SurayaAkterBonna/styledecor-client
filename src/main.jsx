import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="dark"
        toastClassName="bg-[#121212] border border-[#D4AF37] text-white"
        progressClassName="bg-gradient-to-r from-[#AA771C] to-[#F3E5AB]"
      />
    </AuthProvider>
  </React.StrictMode>,
)