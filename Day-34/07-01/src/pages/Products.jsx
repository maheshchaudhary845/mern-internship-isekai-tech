import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useCartContext } from "../context/CartContext";

export default function Products() {
    const [products, setProducts] = useState([]);

    const { cart, addToCart, updateCart } = useContext(useCartContext);

    useEffect(() => {
        async function fetchProducts() {
            let res = await fetch("https://dummyjson.com/products");
            let data = await res.json();

            data.products.map(item => {
                item.addedToCart = false;
                item.quantity = 1;
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
        }
        fetchProducts();
    }, [])

    function cartAdded(cartId) {
        products.map(item => {
            if (item.id === cartId) {
                item.addedToCart = true;
            }
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
                {products.map(product => (
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
                                    if(product.quantity>1){
                                        product.quantity -= 1;
                                    }
                                    }}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    updateCart(product.id, "increment")
                                    product.quantity += 1;
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