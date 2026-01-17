import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";

export const useCartContext = createContext();

export default function CartContext({children}){
    const {auth} = useContext(AuthContext);
    const [cart, setCart] = useState(()=>{
        let userData = JSON.parse(localStorage.getItem(auth?.username)) || {};
        return userData.cart ?? [];
    });

    useEffect(()=>{
        if(auth?.username){
            let userData = JSON.parse(localStorage.getItem(auth.username)) || {};
            userData.cart = [...cart];
            localStorage.setItem(auth.username, JSON.stringify(userData));
        }
    }, [cart])

    
    function addToCart(cartItem){
        cartItem.addedToCart = true;
        setCart((prev)=>[...prev, cartItem]);
        // let itemFound = false;
        // cart.map((item)=>{
        //     if(item.id === cartItem.id){
        //         item.quantity += cartItem.quantity;
        //         item.addedToCart = true;
        //         itemFound = true;
        //         // return;
        //     }
        // })
        // if(itemFound){
        //     userData.cart = [...cart]
        //     localStorage.setItem(auth.username, JSON.stringify(userData))
        //     console.log(userData);
        //     setCart([...cart]);
        // }
        // else{}
    }
    function updateCart(cartId, operation){
        let itemFound = false;
        cart.map((item)=>{
            if(item.id === cartId){
                if(operation == "increment"){
                    item.quantity += 1;
                }
                else if(operation === "decrement"){
                    if(item.quantity > 1){
                        item.quantity -= 1;
                    }
                }
                itemFound = true;
                // return;
            }
        })
        if(itemFound){
            // userData.cart = [...cart]
            // localStorage.setItem(auth.username, JSON.stringify(userData));
            setCart([...cart]);
        }
    }

    function deleteItem(cartId){
        const newCart = cart.filter((item)=>item.id != cartId);
        setCart(newCart);
    }

    return(
        <useCartContext.Provider value={{cart, setCart, addToCart, updateCart, deleteItem}}>
            {children}
        </useCartContext.Provider>
    )
}

// export const useCart = ()=> useContext(useCartContext)