import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    const {auth} = useContext(AuthContext);
    console.log(auth);
    if(!auth.username){
        return <Navigate to="/login" replace/>
    }
    return <Outlet />;

}

export default ProtectedRoute;