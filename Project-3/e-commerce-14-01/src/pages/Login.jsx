import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login(){
    const [login, setLogin] = useState({username: "", password: ""});
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    
    function handleLogin(e){
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    function handleSubmit(){
        async function fetchUser(){
            let res = await fetch("https://dummyjson.com/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: login.username,
                    password: login.password,
                    expiresInMins: 30,
                }),
                // credentials: "include"
            })

            let data = await res.json();
            if(!data.message){
                sessionStorage.setItem("auth", JSON.stringify(data))
                setAuth(data);
                navigate("/");
            }
        }
        fetchUser()
    }
    return(
        <>
            <div className="container">
                <div className="login-box">
                    <input name="username" type="text" placeholder="Username" value={login.username} onChange={handleLogin}/>
                    <input name="password" type="password" placeholder="Password" value={login.password} onChange={handleLogin}/>
                    <button type="submit" onClick={handleSubmit} className="login-btn">Login</button>
                    <p>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login;