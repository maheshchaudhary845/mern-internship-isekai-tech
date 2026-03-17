import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

function ProtectedRoutes({children}){
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();

    if(!auth){
        navigate('/login');
    }
    else{
        return children
    }
    
}

export default ProtectedRoutes;