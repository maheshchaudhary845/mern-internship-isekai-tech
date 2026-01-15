import { Link } from "react-router-dom"

export default function Signup(){
    return(
        <>
            <div className="container">
                <div className="login-box">
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button className="login-btn">Login</button>
                    <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                </div>
            </div>
        </>
    )
}