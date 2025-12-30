import React from "react";
import "./Navbar.css";

function Navbar(){
    return(
        <>
            <nav>
                <div className="logo">Logo</div>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact us</a></li>
                    <li><a href="">Section</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;