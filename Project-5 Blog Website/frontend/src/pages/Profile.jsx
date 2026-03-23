import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Post from "@/components/Post";
import { Link } from "react-router";

function Profile() {
    const { auth, setAuth } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [nameForm, setNameForm] = useState({ firstName: auth ? auth.firstName : "", lastName: auth ? auth.lastName : "" });
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
    const [renewPassword, setRenewPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [updatingName, setUpdatingName] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);
    const [nameSuccess, setNameSuccess] = useState("");
    const [nameError, setNameError] = useState("");
    const [error, setError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    useEffect(() => {
        async function fetchPosts() {
            if (!auth) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/user/${auth.id}`, {
                    credentials: "include"
                });
                const { data, success, message, total } = await res.json();

                if (success) {
                    setPosts(data);
                    setTotalPosts(total);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchPosts();
    }, [auth])

    if (!auth) {
        return <p className="text-center">Loading...</p>
    }

    useEffect(() => {
        if (renewPassword !== passwordForm.newPassword) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
    }, [renewPassword]);

    function handleChangeName(e) {
        setNameForm({ ...nameForm, [e.target.name]: e.target.value.trim() });
    }
    async function handleUpdateName() {
        setNameError("");
        setNameSuccess("");
        if(auth.fullName == nameForm.firstName + " " + nameForm.lastName) {
            return setNameError("Name already exists")
        };
        
        try {
            setUpdatingName(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nameForm)
            })
            const { success, data, message } = await res.json();
            if (success) {
                setAuth({ ...auth, data, fullName: data.firstName + " " + data.lastName });
                setNameSuccess(message)
            }
        } catch (err) {
            console.error(err)
        }finally{
            setUpdatingName(false);
        }
    }

    function handleChangePassword(e) {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    }
    async function handleUpdatePassword() {
        setError("");
        setPasswordSuccess("");
        setUpdatingPassword(true);
        if (!passwordForm.currentPassword.trim() || !passwordForm.newPassword.trim() || !renewPassword.trim()) return;
        if (passwordForm.newPassword != renewPassword) {
            return setError("Passwords are not matched");
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(passwordForm)
            })
            const { success, message } = await res.json();

            if (success) {
                setPasswordSuccess(message);
            }
            else {
                setError(message)
            }
        } catch (err) {
            console.error(err)
        } finally{
            setUpdatingPassword(false);
        }
    }

    return (
        <>
            {showModal && <div className="fixed inset-0 bg-black/70 z-10 flex justify-center backdrop-blur-xs">
                <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-xs p-4 rounded-md max-w-lg w-full h-fit mt-20">
                    <button onClick={() => setShowModal(false)} className="self-end cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" />
                        </svg>
                    </button>
                    <div className="flex flex-col gap-2 max-w-3xs w-full">
                        <div className="flex flex-col">
                            {nameError ? <p className="text-xs text-red-500 text-center">{nameError}</p> : nameSuccess && <p className="text-center text-xs text-green-500">{nameSuccess}</p>}
                            <label htmlFor="first-name" className="text-sm text-gray-400">First name</label>
                            <input
                                required
                                value={nameForm.firstName}
                                onChange={handleChangeName}
                                id="first-name"
                                type="text"
                                name="firstName"
                                className="border-2 border-gray-400 rounded-sm py-1 px-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="last-name" className="text-sm text-gray-400">Last name</label>
                            <input
                                required
                                value={nameForm.lastName}
                                onChange={handleChangeName}
                                id="last-name"
                                type="text"
                                name="lastName"
                                className="border-2 border-gray-400 rounded-sm py-1 px-2"
                            />
                        </div>
                        <button onClick={handleUpdateName} className="bg-green-600 hover:bg-green-700 px-1 py-2 rounded-sm cursor-pointer">{updatingName ? "Updating name..." : "Update name"}</button>
                        <div className="flex flex-col mt-4">
                            {error ? <p className="text-xs text-red-500 text-center">{error}</p> : passwordSuccess && <p className="text-center text-xs text-green-500">{passwordSuccess}</p>}
                            <label htmlFor="current-password" className="text-sm text-gray-400">Current password</label>
                            <input
                                required
                                id="current-password"
                                type="password"
                                name="currentPassword"
                                value={passwordForm.currentPassword}
                                onChange={handleChangePassword}
                                className="border-2 border-gray-400 rounded-sm py-1 px-2"
                                placeholder="*****"
                            />
                        </div>
                        <div className="flex flex-col">

                            <label htmlFor="new-password" className="text-sm text-gray-400">New password</label>
                            <input
                                required
                                id="new-password"
                                type="password"
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handleChangePassword}
                                className="border-2 border-gray-400 rounded-sm py-1 px-2"
                                placeholder="*****"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="current-password" className="text-sm text-gray-400">Re-enter new password</label>
                            <input
                                required
                                id="current-password"
                                type="password"
                                name="renewPassword"
                                value={renewPassword}
                                onChange={(e) => {
                                    setRenewPassword(e.target.value);
                                }}
                                className={`border-2 rounded-sm py-1 px-2 ${passwordMatchError ? "border-red-500" : "border-gray-400"}`}
                                placeholder="*****"
                            />
                        </div>
                        <button onClick={handleUpdatePassword} className="bg-sky-600 hover:bg-sky-700 px-1 py-2 rounded-sm cursor-pointer">{updatingPassword ? "Updating password..." : "Update password"}</button>
                    </div>
                </div>
            </div >}
            <div className="flex flex-col gap-3 items-center max-w-6xl m-auto relative w-fit">
                <div className="img-container rounded-full w-50 h-50 overflow-hidden">
                    <img className="object-cover w-full h-full" src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" alt="profile pic" />
                </div>
                <button onClick={() => setShowModal(true)} className="edit absolute right-0 top-0 cursor-pointer" title="Edit Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round">
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" />
                    </svg>
                </button>
                <h4 className="text-xl">{auth?.fullName}</h4>
                <p className="text-lg">{totalPosts}<span className="text-gray-400"> posts</span></p>
            </div>

            <div className="posts mx-2! mt-10!">
                {posts.map(post => (
                    <Link key={post.id} to={`/post/${post.slug}`}>
                        <Post post={post} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Profile;