import { useEffect, useState } from "react";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("http://localhost:3000/products", {
                method: "GET"
            })
            const data = await res.json();
            setProducts(data.products);
        }
        fetchProducts();
    }, [])
    console.log(products);
    return (
        <>
            <h1>Home Page</h1>
            <h2>Products</h2>
            <div>
                {products.map(product => {
                    return <p key={product.id}>{product.title}</p>;
                })}
            </div>

        </>
    )
}

export default Home;