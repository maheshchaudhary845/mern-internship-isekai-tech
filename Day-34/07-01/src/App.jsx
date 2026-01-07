import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.Jsx';
import About from "./pages/About";
import Products from './pages/Products';
import Navbar from './components/navbar';
import Product from './pages/Product';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/product/:id' element={<Product />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
