import { Link, NavLink } from "react-router-dom"

// Users navigate your application with <Link>, <NavLink>, <Form>, redirect, and useNavigate.

// link is used for simple links, Use <Link> when the link doesn't need active styling
// NavLink is used for navigation links that need to render active and pending states.

// useNavigate:->
// This hook allows the programmer to navigate the user to a new page without the user interacting. Usage of this hook should be uncommon. It's recommended to use the other APIs in this guide when possible.
// Reserve usage of useNavigate to situations where the user is not interacting but you need to navigate, for example:
// Logging them out after inactivity
// Timed UIs like quizzes, etc.

export default function Navbar(){

    return(
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/products">Products</NavLink>
        </nav>
    )
}