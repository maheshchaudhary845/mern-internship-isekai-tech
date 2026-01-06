import { useState } from "react";
import { createContext } from "react";

const UserContextProvider = createContext();

function UserContext({children}){
    const [user, setUser] = useState("Mahesh");
    return(
        <UserContextProvider.Provider value={{user, setUser}}>
            {children}
        </UserContextProvider.Provider>
    )
}

export default UserContext;
export {UserContextProvider};