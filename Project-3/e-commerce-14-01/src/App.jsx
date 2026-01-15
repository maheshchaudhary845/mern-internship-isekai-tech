import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.Jsx';
import About from "./pages/About";
import Products from './pages/Products';
import Navbar from './components/navbar';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
          </Route>
            <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
