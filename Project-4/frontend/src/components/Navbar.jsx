import {NavLink} from 'react-router';

function Navbar(){
    return(
        <nav>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/about"}>About</NavLink></li>
                <li><NavLink to={"/contact"}>Contact Us</NavLink></li>
            </ul>
            
        </nav>
    )
}

export default Navbar;