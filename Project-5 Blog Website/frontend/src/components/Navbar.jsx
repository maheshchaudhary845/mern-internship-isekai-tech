import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(()=>{
        function handleClickOutside(e){
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setShowMenu(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return ()=>{
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])
    return (
        <div className="navbar">
            <nav>
                <div className="left-nav">
                    <div className="logo">Blog Mag</div>
                    <ul>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/popular">Popular</Link></li>
                        <li className="underline green"><Link to="/webdesign">Web Design</Link></li>
                        <li className="underline orange"><Link to="/javascript">JavaScript</Link></li>
                        <li className="underline purple"><Link to="/css">CSS</Link></li>
                        <li className="underline blue"><Link to="/typescript">TypeScript</Link></li>
                    </ul>
                </div>
                <div className="middle-nav">
                    <input type="search" name="search" id="search" placeholder="Search" />
                    <button>Search</button>
                </div>
                <div  className="right-nav">
                    <div onClick={() => setShowMenu(!showMenu)} ref={menuRef} className="svg">
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
                    {showMenu && <div  className="menu">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/contact'}>Contact</Link>
                        <Link to={'/register'}>Join Us</Link>
                    </div>
                    }
                </div>
            </nav>
            <div className="hr"></div>
        </div>
    )
}

export default Navbar;