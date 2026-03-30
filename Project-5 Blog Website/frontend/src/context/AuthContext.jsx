import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}){
    const [auth, setAuth] = useState(null);

    useEffect(()=>{
        async function fetchUser(){
            try{
                const token = localStorage.getItem('token');
                if(!token){
                    setAuth(false);
                    return;
                }
                
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const {data, success} = await res.json();
                if(success){
                    setAuth(data);
                }else{
                    localStorage.removeItem('token')
                    setAuth(false);
                }
            }catch(err){
                console.error(err);
                setAuth(false);
            }
        }
        fetchUser();
    }, [])
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;