// homepage.html
function homePage(){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    

}


// addProduct.html
function getProduct(e) {
    e.preventDefault();
    let name = document.querySelector(".name");
    let description = document.querySelector(".description");
    let price = document.querySelector(".price");
    let image = document.querySelector(".image");

    let product = {
        name: name.value,
        description: description.value,
        price: price.value,
        image: image.value,
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    console.log(product);
}