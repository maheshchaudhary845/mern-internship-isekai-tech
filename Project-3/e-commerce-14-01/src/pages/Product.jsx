import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Product() {
    const [product, setProduct] = useState("");
    const [images, setImages] = useState([]);

    const params = useParams();
    useEffect(() => {
        async function fetchProduct() {
            let res = await fetch(`https://dummyjson.com/products/${params.id}`);
            let data = await res.json();
            setProduct(data);
            setImages(data.images);
        }
        fetchProduct();
    }, [])

    function leftArrow() {
        let imagesLength = images.length * 500;
        let element = document.querySelector(".images")
        let left = parseInt(window.getComputedStyle(element).left);
        if (imagesLength > 500 && left < 0) {
            element.style.left = (left + 500) + "px";
        }
    }
    function rightArrow() {
        let imagesLength = images.length * 500;
        let limit = parseInt(-imagesLength + 500)
        let element = document.querySelector(".images")
        let left = parseInt(window.getComputedStyle(element).left);
        if (imagesLength > 500 && left > limit) {
            element.style.left = (left - 500) + "px";
        }
    }

    // function renderStars(rating) {
    //     const stars = [];
    //     const fullStars = Math.round(rating);

    //     for (let i = 0; i < fullStars; i++) {
    //         stars.push(<span>★</span>)
    //     }

    //     for (let i = 0; i < 5 - fullStars; i++) {
    //         stars.push(<span>☆</span>)
    //     }

    //     return stars;
    // }
    if(!product){
        return <p>Loading...</p>
    }

    return (
        <>
            <section className="product-hero">
                <div className="left-product-hero">
                    <div className="product-img-cont">
                        <div className="images">
                            {images.map(img => (
                                <img key={img} src={img} alt="product img" />
                            ))}
                        </div>
                        <svg onClick={() => leftArrow()} className="left-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" />
                        </svg>
                        <svg onClick={() => rightArrow()} className="right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" />
                        </svg>
                    </div>
                </div>
                <div className="right-product-hero">
                    <h2>{product.title}</h2>
                    <p className="description">{product.description}</p>
                    <p className="price product-price">$ {product.price}</p>
                    <div className="rating-wrapper">
                        <div className="rating-bg">
                            <div className="rating-fg" style={{width: (product.rating/5)*100+"%"}}></div>
                        </div>
                        <p className="rating">{product.rating.toPrecision(2)}</p>
                    </div>
                    <p className="return-policy">{product.returnPolicy}</p>
                    <p className="warranty-info">{product.warrantyInformation}</p>
                    <div className="buttons">
                        <button className="buy-btn">Buy Now</button>
                        <button className="cart-btn">Add to Cart</button>
                    </div>
                </div>
            </section>
        </>
    )
}