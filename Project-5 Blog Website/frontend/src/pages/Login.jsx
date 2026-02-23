import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login(){
    const [form, setForm] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async()=>{
        try{
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const {success} = await res.json();
            if(success){
                navigate('/')
            }
        }catch(err){
            console.error(err.message);
        }
    }
    return(
        <div className="bg">
            <div className="auth-box">
                <h1>LOGIN</h1>
                <div className="auth">
                    <input type="email" name="email" value={form.email} onChange={handleForm} placeholder="Email" />
                    <input type="password" name="password" value={form.password} onChange={handleForm} placeholder="Password" />
                    <Link className="forgot" to={'/forgotpwd'}>Forgot Password?</Link>
                </div>
                <div className="button">
                    <button className="btn-login" onClick={handleSubmit}>Login</button>
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