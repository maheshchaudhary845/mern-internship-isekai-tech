import { Link } from "react-router";

function Register() {
    return (
        <div className="bg">
            <div className="auth-box">
                <h1>REGISTER</h1>
                <div className="auth">
                    <div className="name">
                        <input id="firstname" type="text" placeholder="First Name" />
                        <input id="lastname" type="text" placeholder="Last Name" />
                    </div>
                    <input type="email" name="email" id="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                </div>
                <div className="button">
                    <button className="btn-register">Register</button>
                </div>
                <div className="login-cont">
                    <p>Already have an account?</p>
                    <Link className="login" to={'/login'}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;