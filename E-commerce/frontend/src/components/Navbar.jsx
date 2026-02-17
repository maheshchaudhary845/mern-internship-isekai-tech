import { Link } from "react-router";

function Navbar() {
    return (
        <nav>
            <div className="logo">E-Commerce</div>
            <div className="search-cont">
                <input type="search" name="search" id="search-bar" placeholder="Search for products" />
            </div>
        </nav>
    )
}

export default Navbar;