
function getQuote() {
    $.ajax({
        url: "https://dummyjson.com/quotes/random",
        method: "GET",
        success: (res) => {
            console.log(res);

            let output = document.querySelector(".output");
            output.innerHTML = res.quote;
        },
        error: (err) => {
            console.log(err);
        },
    });
}
