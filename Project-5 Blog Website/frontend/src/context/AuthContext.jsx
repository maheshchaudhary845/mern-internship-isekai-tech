import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}){
    const [auth, setAuth] = useState(null);

    useEffect(()=>{
        async function fetchUser(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                    credentials: "include"
                });
                const {data, success} = await res.json();
                if(success){
                    setAuth(data);
                }else{
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