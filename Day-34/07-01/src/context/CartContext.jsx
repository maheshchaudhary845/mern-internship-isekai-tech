import { createContext, useContext, useState } from "react";

export const useCartContext = createContext();

export default function CartContext({children}){
    const [cart, setCart] = useState([]);
    
    function addToCart(cartItem){
        let itemFound = false;
        cart.map((item)=>{
            if(item.id === cartItem.id){
                item.quantity += cartItem.quantity;
                itemFound = true;
                return;
            }
        })
        if(itemFound){
            setCart([...cart]);
        }
        else{
            setCart((prev)=>[...prev, cartItem]);
        }
        console.log(itemFound);
        console.log(cart);
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
                return;
            }
        })
        console.log(cart)
        if(itemFound){
            setCart([...cart]);
        }
    }

    return(
        <useCartContext.Provider value={{cart, setCart, addToCart, updateCart}}>
            {children}
        </useCartContext.Provider>
    )
}

// export const useCart = ()=> useContext(useCartContext)