import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const menuRef = useRef(null);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    async function handleLogout() {
        try {
            setShowMenu(false)
            localStorage.removeItem('token');
            setAuth(false);
            navigate('/login');
            
        } catch (err) {
            console.error(err);
        }
    }

    async function handleSearch() {
        if (!search.trim()) return;

        navigate(`/search?query=${search}`);
        setSearch('')
    }
    return (
        <div className="navbar">
            <nav className="mx-2">
                <div className="left-nav">
                    <div className="logo"><Link to={'/'}>Blog Mag</Link></div>
                    <ul>
                        <li className="lg:block! hidden!"><Link to="/popular">Popular</Link></li>
                        <li className="green lg:block! hidden!"><Link to="/category/webdesign">Web Design</Link></li>
                        <li className="orange lg:block! hidden!"><Link to="/category/javascript">JavaScript</Link></li>
                        <li className="purple lg:block! hidden!"><Link to="/category/css">CSS</Link></li>
                        <li className="blue lg:block! hidden!"><Link to="/category/typescript">TypeScript</Link></li>
                    </ul>
                </div>
                <div className="middle-nav hidden! sm:flex!">
                    <input type="search" className="bg-[#303030]" name="search" value={search} onChange={(e) => setSearch(e.target.value)} id="search" placeholder="Search" />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div ref={menuRef} className="right-nav">
                    <div onClick={() => setShowMenu(!showMenu)} className="svg hidden sm:block">
                        {showMenu ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" />
                        </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 5L20 5" />
                                <path d="M4 12L20 12" />
                                <path d="M4 19L20 19" />
                            </svg>
                        }
                    </div>
                    {showMenu && <div className="menu z-10 min-w-2xs w-full">
                        {auth &&
                            <>
                                <p className="p-2">{auth.email}</p>
                                <Link to={'/profile'} onClick={() => setShowMenu(false)}>Profile</Link>
                                <Link to={'/dashboard'} onClick={() => setShowMenu(false)}>Dashboard</Link>
                            </>
                        }
                        <Link to={'/'} onClick={() => setShowMenu(false)}>Home</Link>
                        <Link to={'/about'} onClick={() => setShowMenu(false)}>About</Link>
                        <Link to={'/contact'} onClick={() => setShowMenu(false)}>Contact</Link>
                        {!auth ?
                            <>
                                <Link to={'/register'} onClick={() => setShowMenu(false)}>Join Us</Link>
                                <Link to={'/login'} onClick={() => setShowMenu(false)}>Login</Link>
                            </>
                            :
                            <Link onClick={handleLogout}>Log out</Link>
                        }
                    </div>
                    }


                    <div onClick={() => setMobileMenu(!mobileMenu)} className="svg block sm:hidden">
                        {mobileMenu ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" />
                        </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 5L20 5" />
                                <path d="M4 12L20 12" />
                                <path d="M4 19L20 19" />
                            </svg>
                        }
                    </div>
                    {mobileMenu && <div className="bg-[#1a1a1a] inset-0 fixed z-10 flex flex-col p-6">
                        <button onClick={() => setMobileMenu(!mobileMenu)} className="self-end cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" />
                        </svg></button>

                        <div className="flex mt-6 gap-2">
                            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-gray-800 px-3 py-2 rounded-md" />
                            <button onClick={(e) => {
                                handleSearch(e)
                                setMobileMenu(false);
                            }} className="px-4 py-2 bg-green-600 rounded-md cursor-pointer">Go</button>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 text-lg">
                            {auth &&
                                <>
                                    <Link to='/profile' onClick={() => setMobileMenu(false)}>Profile</Link>
                                    <Link to="/dashboard" onClick={() => setMobileMenu(false)}>Dashboard</Link>
                                </>}
                            <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                            <Link to="/popular" onClick={() => setMobileMenu(false)}>Popular</Link>
                            <Link to="/category/webdesign" onClick={() => setMobileMenu(false)}>Web Design</Link>
                            <Link to="/category/javascript" onClick={() => setMobileMenu(false)}>JavaScript</Link>
                            <Link to="/category/css" onClick={() => setMobileMenu(false)}>CSS</Link>
                            <Link to="/category/typescript" onClick={() => setMobileMenu(false)}>TypeScript</Link>
                            <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
                            <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>

                            {auth ? (
                                <>
                                    <button onClick={handleLogout} className="bg-red-500 py-2 rounded-lg">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
                                    <Link to="/register" onClick={() => setMobileMenu(false)}>Register</Link>
                                </>
                            )}
                        </div>
                    </div>}
                </div>
            </nav>
            <div className="hr"></div>
        </div>
    )
}

export default Navbar;