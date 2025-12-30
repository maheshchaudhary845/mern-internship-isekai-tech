import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Hero from './components/Hero.jsx'
import Cards from './components/Cards.jsx'
import Recipes from './components/Recipes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <App />
    <Hero />
    <Cards />
    <Recipes />
    <Footer />
  </StrictMode>,
)
