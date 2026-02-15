import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Admin from './pages/Admin.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx'

function App() {

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<ContactUs />}/>
          <Route path='/admin' element={<Admin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
