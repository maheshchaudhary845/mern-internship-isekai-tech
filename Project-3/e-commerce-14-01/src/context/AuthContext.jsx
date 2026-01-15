import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
export default function AuthProvider({children}){
    const [auth, setAuth] = useState({})
    console.log("auth in authcontext",auth)
    useEffect(()=>{
        async function settingAuth(){
            let session = await JSON.parse(sessionStorage.getItem("auth")) || {};
            console.log("sessionnnnnnnnnnnn",session);
            setAuth(session)
        }
        settingAuth();
    },[])
   
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}