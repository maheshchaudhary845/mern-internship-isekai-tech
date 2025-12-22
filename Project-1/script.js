// homepage.html
function homePage() {
    let products = JSON.parse(localStorage.getItem("products")) || [];


}


// addProduct.html

function cartUpdate() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.querySelector(".count");
    if (cart.length > 0) {
        count.classList.add("add-count")
        count.textContent = cart.length;
    }
}
cartUpdate();

function getProduct(e) {
    e.preventDefault();
    let name = document.querySelector(".name");
    let description = document.querySelector(".description");
    let price = document.querySelector(".price");
    let image = document.querySelector(".image");

    let product = {
        id: Date.now(),
        title: name.value,
        description: description.value,
        price: price.value,
        thumbnail: image.value,
        wishlist: false,
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    console.log(product);
}