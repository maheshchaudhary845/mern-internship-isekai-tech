    import { useEffect, useState, useRef } from "react";
    import { Link, useNavigate } from "react-router";

    function Navbar() {
        const [showMenu, setShowMenu] = useState(false);
        const menuRef = useRef(null);
        const [user, setUser] = useState({});
        const navigate = useNavigate();

        useEffect(()=>{
            async function fetchUser(){
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                    method: "GET",
                    credentials: "include"
                });

                if(!res.ok) return;

                const {data} = await res.json();
                setUser(data);
            }
            fetchUser();
        },[])

        useEffect(()=>{
            function handleClickOutside(e){
                if(menuRef.current && !menuRef.current.contains(e.target)){
                    setShowMenu(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);

            return ()=>{
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [])

        async function handleLogout(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                    method: "POST",
                    credentials: "include"
                })
                const {success, message} = await res.json();
                if(success){
                    console.log(message);
                    setUser({});
                    navigate('/login');
                }

            }catch(err){
                console.error(err);
            }
        }
        return (
            <div className="navbar">
                <nav>
                    <div className="left-nav">
                        <div className="logo"><Link to={'/'}>Blog Mag</Link></div>
                        <ul>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/popular">Popular</Link></li>
                            <li className="green"><Link to="/category/webdesign">Web Design</Link></li>
                            <li className="orange"><Link to="/category/javascript">JavaScript</Link></li>
                            <li className="purple"><Link to="/category/css">CSS</Link></li>
                            <li className="blue"><Link to="/category/typescript">TypeScript</Link></li>
                        </ul>
                    </div>
                    <div className="middle-nav">
                        <input type="search" className="bg-[#303030]" name="search" id="search" placeholder="Search" />
                        <button>Search</button>
                    </div>
                    <div ref={menuRef} className="right-nav">
                        <div onClick={() => setShowMenu(!showMenu)} className="svg">
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
                        {showMenu && <div className="menu z-10 min-w-fit w-full">
                            {user.fullName && 
                            <p className="p-2">{user.email}</p>
                            }
                            <Link to={'/'} onClick={()=>setShowMenu(false)}>Home</Link>
                            <Link to={'/about'} onClick={()=>setShowMenu(false)}>About</Link>
                            <Link to={'/contact'} onClick={()=>setShowMenu(false)}>Contact</Link>
                            {!user.id ?
                            <>
                            <Link to={'/register'} onClick={()=>setShowMenu(false)}>Join Us</Link>
                            <Link to={'/login'} onClick={()=>setShowMenu(false)}>Login</Link>
                            </>
                            :
                            <Link onClick={handleLogout}>Log out</Link>
                            }
                        </div>
                        }
                    </div>
                </nav>
                <div className="hr"></div>
            </div>
        )
    }

    export default Navbar;