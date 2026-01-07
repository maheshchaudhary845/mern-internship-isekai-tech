import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            let res = await fetch("https://dummyjson.com/products");
            let data = await res.json();
            setProducts(data.products);
        }
        fetchProducts();
    }, [])

    // function clickedProduct(id){
    //     onClick={()=>clickedProduct(product.id)}
    //     window.location.href = `./products/product/${id}`
    // }
    return (
        <>
            <h1>Products</h1>
            <div className="cards">
                {products.map(product => (
                    <Link to={`./product/${product.id}`} className="card" key={product.id}>
                        <div className="img-cont">
                            <img src={product.thumbnail} alt="" />
                        </div>
                        <p>{product.id}</p>
                        <h3>{product.title}</h3>
                        <p className="description">{product.description}</p>
                        <p className='price'>$ {product.price}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}