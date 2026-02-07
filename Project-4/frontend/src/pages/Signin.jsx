import { useState } from "react"

function Signin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
    }

    return (
        <>
            <h1>Sign in</h1>

            <div className="container">
                <div className="form-container">
                    <form>
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => handleForm(e)} />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e) => handleForm(e)} />
                        <button id="btn-signup" onClick={handleSubmit} style={{ cursor: loading && 'not-allowed' }} disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
                        {error && <p id="error">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin;