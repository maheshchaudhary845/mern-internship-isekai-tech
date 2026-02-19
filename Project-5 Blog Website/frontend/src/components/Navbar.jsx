import { Link } from "react-router";

function Navbar() {
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
            <div className="right-nav">
                
            </div>
        </nav>
        <div className="hr"></div>
        </div>
    )
}

export default Navbar;