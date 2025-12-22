
function getImage(){
    let imgWidth = Number(prompt("Enter width of the image"));
    let imgHeight = Number(prompt("Enter height of the image"));
    let bgColor = prompt("Enter background color of the image in hex");
    let font = prompt("Enter the font name");
    let text = prompt("Enter the text you want to display");
    // let urlText = text.replace(" ", "+");
    $.ajax({
        url: `https://dummyjson.com/image/${imgWidth}x${imgHeight}/${bgColor}?fontFamily=${font}&text=${text}`,
        method: "GET",
        xhrFields: {
            responseType: "blob",
        },
        success: (res)=>{
            let image = document.querySelector(".image");
            let blob = URL.createObjectURL(res);
            image.src = blob;

            // URL.revokeObjectURL(blob);
        },
        error: (err)=>{
            console.error(err);
        }
    })
}