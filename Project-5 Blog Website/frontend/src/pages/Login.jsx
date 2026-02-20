import { Link } from "react-router";

function Login(){
    return(
        <div className="bg">
            <div className="auth-box">
                <h1>LOGIN</h1>
                <div className="auth">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <Link className="forgot" to={'/forgotpwd'}>Forgot Password?</Link>
                </div>
                <div className="button">
                    <button className="btn-login">Login</button>
                </div>
                <div className="register-cont">
                    <p>Don&apos;t have an account?</p>
                    <Link className="register" to={'/register'}>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;