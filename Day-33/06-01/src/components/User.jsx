import { useContext } from "react";
import { UserContextProvider } from "../context/UserContext";

function User(){
    const {user, setUser} = useContext(UserContextProvider);
    console.log(user);
    return(
        <>
            <div>User: {user}</div>
            <button onClick={()=>setUser("Admin")}>Set User to Admin</button>
        </>
    )
}

export default User;