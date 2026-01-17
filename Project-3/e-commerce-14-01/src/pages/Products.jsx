import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useCartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const { auth } = useContext(AuthContext);
    const { cart, addToCart, updateCart } = useContext(useCartContext);

    // useEffect(()=>{
    //     let userData = JSON.parse(localStorage.getItem(auth.username)) || {};

    // })

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem(auth.username)) || {};

        async function fetchProducts() {
            let res = await fetch("https://dummyjson.com/products");
            let data = await res.json();
            data.products.map(item => {
                item.addedToCart = false;
                item.quantity = 1;
                console.log('cart', cart)
                if (cart.length > 0) {
                    cart.map(cItem => {
                        if (cItem.id == item.id) {
                            item.addedToCart = true;
                            item.quantity = cItem.quantity;
                        }
                    })
                }
            });
            setProducts(data.products);
            userData.products = data.products;
            if (auth.username) {
                localStorage.setItem(auth.username, JSON.stringify(userData))
            }
        }
        if (userData.products) {
            setProducts(userData.products);

            if(userData.cart){
                setProducts(prevProducts =>{
                    return prevProducts.map(product=>{
                        const cartItem = userData.cart.find(c=> c.id === product.id);

                        if(cartItem){
                            return {
                                ...product,
                                quantity: cartItem.quantity,
                                addedToCart: cartItem.addedToCart,
                            }
                        }
                        return product;
                    })
                })
            }
        } else {
            fetchProducts();
        }
    }, [])

    // useEffect(()=>{
    //     let userData = JSON.parse(localStorage.getItem(auth.username)) || {};
        
    // },[])

    function cartAdded(cartId) {
        let userData = JSON.parse(localStorage.getItem(auth.username)) || {};

        products.map(item => {
            if (item.id === cartId) {
                item.addedToCart = true;
            }
        })
        userData.products = products;
        localStorage.setItem(auth.username, JSON.stringify(userData))
    }

    function updateProducts(productId, operation) {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product=>{
                if(productId !== product.id) return product;
                
                if(operation === "increment"){
                    return{...product, quantity: product.quantity + 1}
                }
                
                if(operation === "decrement"){
                    return {...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1}
                }
                
                return product;
            })
            let userData = JSON.parse(localStorage.getItem(auth.username)) || {};
            userData.products = updatedProducts;
            localStorage.setItem(auth.username, JSON.stringify(userData));

            return updatedProducts;
        })
    }


    // function clickedProduct(id){
    //     onClick={()=>clickedProduct(product.id)}
    //     window.location.href = `./products/product/${id}`
    // }
    return (
        <>
            <h1>Products</h1>
            <div className="cards">
                {products?.map(product => (
                    <Link to={`/product/${product.id}`} className="card" key={product.id}>
                        <div className="img-cont">
                            <img src={product.thumbnail} alt="" />
                        </div>
                        <p>{product.id}</p>
                        <h3>{product.title}</h3>
                        <p className="description">{product.description}</p>
                        <p className='price'>$ {product.price}</p>
                        <div className="buttons">
                            {product.addedToCart
                                ? <div className="quantity">
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        updateCart(product.id, "decrement")
                                        updateProducts(product.id, "decrement")
                                    }}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        updateCart(product.id, "increment")
                                        updateProducts(product.id, "increment")
                                    }}>+</button>
                                </div>
                                : <button className="cart-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    // setCart((prev)=> [...prev, {...product, quantity: 1}])
                                    addToCart({ ...product, quantity: 1 });
                                    cartAdded(product.id);
                                }}>Add to Cart</button>}
                            <button className="buy-btn">Buy Now</button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}