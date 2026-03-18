import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const location = useLocation()

    const next = new URLSearchParams(location.search)

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
                credentials: "include"
            })

            const { success } = await res.json();
            if (success) {
                const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                    credentials: "include"
                });

                const { data } = await userRes.json();
                setAuth(data);
                if (next.get('next')) {
                    navigate(next.get('next'))
                }
                else {
                    navigate('/');

                }

            }
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
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