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
        if(itemFound){
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