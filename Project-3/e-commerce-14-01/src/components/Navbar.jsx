import { Link, NavLink } from "react-router-dom"
// Users navigate your application with <Link>, <NavLink>, <Form>, redirect, and useNavigate.

// link is used for simple links, Use <Link> when the link doesn't need active styling
// NavLink is used for navigation links that need to render active and pending states.

// useNavigate:->
// This hook allows the programmer to navigate the user to a new page without the user interacting. Usage of this hook should be uncommon. It's recommended to use the other APIs in this guide when possible.
// Reserve usage of useNavigate to situations where the user is not interacting but you need to navigate, for example:
// Logging them out after inactivity
// Timed UIs like quizzes, etc.


import { useContext } from "react"
import { useCartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const {cart} = useContext(useCartContext);
    const {auth, setAuth} = useContext(AuthContext);


    if(!auth.username){
        return null;
    }
    return (
        
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
            </ul>
            <div className="right-nav">
                <Link className="cart" to={"/cart"}>
                    <span>Cart</span>
                    <span className="cart-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
                            <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" />
                            <path d="M6 6H22" />
                            <circle cx="6" cy="20" r="2" />
                            <circle cx="17" cy="20" r="2" />
                            <path d="M8 20L15 20" />
                            <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" />
                        </svg>
                        <span className="cart-length">{cart.length}</span>
                    </span>
                </Link>
                <p>{auth.username}</p>
                <Link to="/login"><button onClick={()=>setAuth({})} className="logout-btn">Logout</button></Link>
            </div>
        </nav>
    )
}