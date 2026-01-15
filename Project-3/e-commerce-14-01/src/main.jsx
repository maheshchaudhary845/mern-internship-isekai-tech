import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartContext from './context/CartContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <CartContext>
        <App />
      </CartContext>
    </AuthProvider>
  </StrictMode>,
)
