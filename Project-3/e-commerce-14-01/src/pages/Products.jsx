import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useCartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const { auth, setAuth } = useContext(AuthContext);
    const { cart, setCart, addToCart, updateCart } = useContext(useCartContext);

   const user = auth.username; 
    useEffect(() => {
        let session = JSON.parse(sessionStorage.getItem("auth"));
        if(session.username){
            setAuth(session);
        }
        let userData = JSON.parse(localStorage.getItem(auth.username)) || {};
        console.log('fsgah', userData)
        if (userData.cart) {
            setCart([...userData.cart])
        }
    }, [])
    console.log('authhhhhhh', auth)

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
        } else {
            fetchProducts();
        }
    }, [])

    // useEffect(()=>{
    //     userData.products = products;
    //     localStorage.setItem(auth.username, JSON.stringify(userData));
    // },[products])

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

    function updateProducts(product, operation) {
        let userData = JSON.parse(localStorage.getItem(auth.username)) || {};

        if (operation === "increment") {
            product.quantity += 1;
            // setProducts([...products])
            userData.products = products;
            localStorage.setItem(auth.username, JSON.stringify(userData))
        } else if (operation === "decrement") {
            if (product.quantity > 1) {
                product.quantity -= 1;
                // setProducts([...products])
                userData.products = products;
                localStorage.setItem(auth.username, JSON.stringify(userData))
            }
        }
    }


    // function clickedProduct(id){
    //     onClick={()=>clickedProduct(product.id)}
    //     window.location.href = `./products/product/${id}`
    // }
    return (
        user && <div>
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
                                        updateProducts(product, "decrement")
                                    }}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        updateCart(product.id, "increment")
                                        updateProducts(product, "increment")
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
        </div>
    )
}