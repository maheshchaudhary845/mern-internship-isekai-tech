

function setBodyColor(){
    let bodyInput = document.body.querySelector("input[name=bodyColor]");
    let bodyColor = bodyInput.value;
    console.log(bodyInput.getAttribute("type"));
    // bodyInput.className = "addedbydot"; // will override
    // bodyInput.setAttribute("class", "body-color body-input"); // will override
    bodyInput.classList.add("body-color", "body-input");
    console.log(bodyInput.getAttribute("class"));
    document.body.style.backgroundColor = bodyColor;
}

let div = document.createElement("div");
div.classList.add("container");
document.querySelector("button[class=setBodyColorButton]").insertAdjacentElement("afterend", div)

let divBox = document.createElement("div");
divBox.classList.add("box");
divBox.style.width = 0;

let widthInput = document.createElement("input");
widthInput.type = "number";
widthInput.placeholder = "Enter Width of the box";
widthInput.classList.add("box-width");

let heightInput = document.createElement("input");
heightInput.type = "number";
heightInput.classList.add("box-height");
heightInput.placeholder = "Enter height of the box";

let button = document.createElement("button");
button.classList.add("setBoxButton");
button.textContent = "Create box";
button.onclick = setBox;

document.querySelector(".container").insertAdjacentElement("afterbegin", widthInput);
document.querySelector(".box-width").insertAdjacentElement("afterend", heightInput);
document.querySelector(".box-height").insertAdjacentElement("afterend", button);
document.querySelector(".setBoxButton").insertAdjacentElement("afterend", divBox)

function setBox(){
    let box = document.querySelector(".box-width");
    let boxWidth = box.value;
    console.log(boxWidth);
    document.querySelector(".box").style.width = boxWidth + "px";
    
    let box2 = document.querySelector(".box-height");
    let boxHeight = box2.value;
    console.log(boxHeight);
    document.querySelector(".box").style.height = boxHeight + "px";
    
    document.querySelector(".box").style.border = "2px solid black";

}