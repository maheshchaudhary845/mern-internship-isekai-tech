let container = document.createElement("div");
container.classList.add("container");

let select = document.createElement("select");
select.name = "elementCategory";
select.id = "selection";


document.querySelector("h1").insertAdjacentElement("afterend", container);

let label = document.createElement("label");
label.textContent = "Select the tag you want to create";
label.setAttribute("for", "selection");

let containerSelected = document.querySelector(".container");
containerSelected.append(label);
containerSelected.append(select);

let option1 = document.createElement("option");
option1.innerText = "div";
// option1.onclick = create;
let option2 = document.createElement("option");
option2.innerText = "img";
// option2.onclick = create;
let option3 = document.createElement("option");
option3.innerText = "input";

let selectTag = document.querySelector("select");
selectTag.append(option1);
selectTag.append(option2);
selectTag.append(option3);

let createButton = document.createElement("button");
createButton.textContent = "Create";
createButton.onclick = create;
document.querySelector(".container").append(createButton);

let divContainer = document.createElement("div");
divContainer.classList.add("divContainer");
document.querySelector(".container").insertAdjacentElement("afterend", divContainer);
function create() {
    if (selectTag.value === option1.textContent) {
        let div = document.createElement("div");
        div.classList.add("divElement")

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "What do you want to put inside the div";
        let set = document.createElement("button");
        set.textContent = "Set";
        document.querySelector(".divContainer").append(input);
        document.querySelector(".divContainer").append(set);
        set.addEventListener("click", function () {
            div.textContent = input.value;
            document.querySelector(".divContainer").append(div);
            document.querySelector(".divContainer").removeChild(input);
            document.querySelector(".divContainer").removeChild(set);
        })
    }

    if (selectTag.value === option2.textContent) {
        let img = document.createElement("img");

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter src";
        let inputWidth = document.createElement("input");
        inputWidth.type = "number";
        inputWidth.placeholder = "Enter width";
        let inputHeight = document.createElement("input");
        inputHeight.type = "number";
        inputHeight.placeholder = "Enter height";

        let set = document.createElement("button");
        set.textContent = "Set";

        document.querySelector(".divContainer").append(input);
        document.querySelector(".divContainer").append(inputWidth);
        document.querySelector(".divContainer").append(inputHeight);
        document.querySelector(".divContainer").append(set);

        set.addEventListener("click", function () {
            img.src = input.value;
            img.width = inputWidth.value;
            img.height = inputHeight.value;
            img.style = "object-fit: cover; object-position: center;";

            document.querySelector(".divContainer").append(img);
            document.querySelector(".divContainer").removeChild(input);
            document.querySelector(".divContainer").removeChild(inputWidth);
            document.querySelector(".divContainer").removeChild(inputHeight);
            document.querySelector(".divContainer").removeChild(set);
        })
    }

    if (selectTag.value === option3.textContent) {
        let input = document.createElement("input");
        input.type = "text";

        document.querySelector(".divContainer").append(input);
    }
}