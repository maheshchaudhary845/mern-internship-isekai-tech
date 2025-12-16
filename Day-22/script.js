let divContainer = document.createElement("div");
divContainer.classList.add("container");
document.querySelector("h1").insertAdjacentElement("afterend", divContainer);

let createImgDiv = document.createElement("div");
createImgDiv.classList.add("upper-container");
document.querySelector(".container").append(createImgDiv);

let addImageButton = document.createElement("button");
addImageButton.textContent = "Add Image";
addImageButton.onclick = createImage;
document.querySelector(".upper-container").append(addImageButton);


function createImage() {
    let image = document.createElement("img");
    addImageButton.disabled = true;

    let div = document.createElement("div");
    div.classList.add("src-div");
    document.querySelector(".upper-container").append(div);

    let srcInput = document.createElement("input");
    srcInput.type = "text";
    srcInput.placeholder = "Enter src";
    document.querySelector(".src-div").append(srcInput);

    let insertButton = document.createElement("button");
    insertButton.textContent = "Insert";
    document.querySelector(".src-div").append(insertButton);
    insertButton.addEventListener("click", function () {
        if (srcInput.value  .length !== 0) {
            image.src = srcInput.value;
            image.style = "width: 100%; height: 100%; object-fit: cover; object-position: center;"
            image.addEventListener("click", function (e) {
                let outerdiv = document.createElement("div");
                outerdiv.classList.add("outer-div");
                outerdiv.style = "inset: 0; position: fixed; background-color: rgba(0, 0, 0, 0.2); backdrop-filter: blur(2px);";
                document.querySelector(".container").append(outerdiv);

                let div = document.createElement("div");
                div.classList.add("big-img");
                div.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50%; height: 600px;"
                document.querySelector(".outer-div").append(div);

                let img = document.createElement("img");
                img.style = "width: 100%; height: 100%; object-fit: cover; object-position: center;"
                img.src = e.target.src;
                document.querySelector(".big-img").append(img);

                document.querySelector(".big-img").innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5.43212 18.5679C6.00828 19.144 6.94243 19.144 7.51859 18.5679L12.0003 14.0863L16.4814 18.5672C17.0573 19.1431 17.9909 19.1434 18.5672 18.5679C19.144 17.9919 19.1443 17.0573 18.5679 16.4809L14.0868 12L18.5679 7.51913C19.1438 6.94326 19.1441 6.0097 18.5686 5.43346C17.9925 4.85669 17.0578 4.85638 16.4814 5.43278L12.0003 9.91365L7.51859 5.4321C6.94243 4.85597 6.00828 4.85597 5.43212 5.4321C4.85596 6.00823 4.85596 6.94232 5.43212 7.51845L9.91387 12L5.43212 16.4816C4.85596 17.0577 4.85596 17.9918 5.43212 18.5679Z" />
            </svg>`;
                let svg = document.querySelector(".big-img>svg");
                svg.style = "position: absolute; right: 10px; top: 10px; cursor: pointer; filter: invert(1);"
                svg.addEventListener("click", function () {
                    document.querySelector(".outer-div").remove();
                })
            })

            let gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridElement.style.overflow = "hidden";
            document.querySelector(".grid").append(gridElement);
            let length = document.querySelectorAll(".grid-element").length;
            let index = length - 1;
            document.querySelectorAll(".grid-element")[index].append(image);

            document.querySelector(".src-div").remove();
            addImageButton.disabled = false;
        }
    })
}

let lowerContainer = document.createElement("div");
lowerContainer.classList.add("lower-container");
document.querySelector(".container").append(lowerContainer);

let gridDiv = document.createElement("div");
gridDiv.classList.add("grid")
gridDiv.style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-auto-rows: 400px; gap: 20px";
document.querySelector(".lower-container").append(gridDiv);