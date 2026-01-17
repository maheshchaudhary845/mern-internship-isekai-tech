import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
export default function AuthProvider({children}){
    const [auth, setAuth] = useState(()=>{
        return JSON.parse(sessionStorage.getItem("auth")) || null
    })
    useEffect(()=>{
            let session = JSON.parse(sessionStorage.getItem("auth")) || {};
            setAuth(session)
    },[])
   
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}