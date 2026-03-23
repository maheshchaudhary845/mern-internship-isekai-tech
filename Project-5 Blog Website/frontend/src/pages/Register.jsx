import { useState } from "react";
import { Link, useNavigate } from "react-router";


function Register() {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            const { message } = data;
            console.log(message);
            if(data.success){
                navigate('/login');
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div className="bg">
            <div className="auth-box">
                <h1>REGISTER</h1>
                <div className="auth">
                    <div className="name">
                        <input id="firstname" name="firstName" type="text" value={form.firstName} onChange={handleForm} placeholder="First Name" />
                        <input id="lastname" name="lastName" type="text" value={form.lastName} onChange={handleForm} placeholder="Last Name" />
                    </div>
                    <input type="email" name="email" id="email" value={form.email} onChange={handleForm} placeholder="Email" />
                    <input type="password" name="password" value={form.password} onChange={handleForm} placeholder="Password" />
                </div>
                <div className="button">
                    <button className="btn-register" onClick={handleSubmit}>Register</button>
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