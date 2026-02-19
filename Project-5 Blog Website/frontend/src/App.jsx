import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
