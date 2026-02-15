import { useEffect, useState } from "react";

function Signup() {
    const [form, setForm] = useState({name: '', email: '', password: '', role: ''})
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleForm(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try{
            const res = await fetch("http://localhost:3000/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            
            const data = await res.json();
            if(!data.success){
                setError(data.message)
            }else{
                setError('');
            }
        }
        catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }
    console.log(form)
    return (
        <>
            <h1>Sign up</h1>

            <div className="container">
                <div className="form-container">
                    <form>
                        <input type="text" name="name" placeholder="Full name" value={form.name} onChange={(e)=>handleForm(e)}/>
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e)=>handleForm(e)}/>
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e)=>handleForm(e)}/>
                        <select name="role" value={form.value} onChange={(e)=>handleForm(e)}>
                            <option value="">Select role</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        <button id="btn-signup" onClick={handleSubmit} style={{cursor: loading && 'not-allowed'}} disabled={loading}>{loading ? "Signing up...":"Sign up"}</button>
                        {error && <p id="error">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;