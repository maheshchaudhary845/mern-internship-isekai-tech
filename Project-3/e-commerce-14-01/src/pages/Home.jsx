import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext";

export default function Home(){
    const {auth} = useContext(AuthContext);
    const {cart} = useContext(useCartContext);

    console.log(auth, cart);
    
    return(
        <>
            <h1>Home</h1>
        </>
    )
}