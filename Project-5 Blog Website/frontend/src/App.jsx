import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/Dashboard/CreatePost';
import SinglePost from './pages/SinglePost';
import CategoryPosts from './pages/CategoryPosts';
import Search from './pages/Search';
import EditPost from './pages/Dashboard/EditPost';


function AppContent() {
  const location = useLocation();
  const hideRoutes = ['/login', '/register'];
  const hideNavbar = hideRoutes.includes(location.pathname);

  return (
    <>
      {
        !hideNavbar && <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/post/:slug' element={<SinglePost />}/>
        <Route path='/category/:slug' element={<CategoryPosts />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/dashboard/editpost/:slug' element={<EditPost />}/>
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className='container'>
      <Router>
        <AppContent />

      </Router>
    </div>
  )
}

export default App
