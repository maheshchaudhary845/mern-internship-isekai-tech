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
    createButton.disabled = true;
    if (selectTag.value === option1.textContent) {
        let style = "";

        let div = document.createElement("div");
        div.classList.add("divElement")

        let onDiv = document.createElement("div");
        onDiv.classList.add("onScreen");
        document.querySelector(".divContainer").append(onDiv);

        let upperDiv = document.createElement("div");
        upperDiv.classList.add("upper-div");
        document.querySelector(".onScreen").append(upperDiv);

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "What do you want to put inside the div";
        document.querySelector(".upper-div").append(input);

        let lowerDiv = document.createElement("div");
        lowerDiv.classList.add("lower-div");
        document.querySelector(".onScreen").append(lowerDiv);

        let addCss = document.createElement("button");
        addCss.classList.add("add-css");
        addCss.textContent = "Add CSS";
        document.querySelector(".lower-div").append(addCss);

        let showCss = document.createElement("div");
        showCss.classList.add("show-css");
        document.querySelector(".onScreen").append(showCss);
        let h4 = document.createElement("h4");
        h4.textContent = "Applied CSS";
        document.querySelector(".show-css").append(h4);


        addCss.addEventListener("click", function () {
            addCss.disabled = true;
            let cssProperty = document.createElement("input");
            cssProperty.type = "text";
            cssProperty.placeholder = "Enter CSS Property";

            let cssValue = document.createElement("input");
            cssValue.type = "text";
            cssValue.placeholder = "Enter Value of  CSS property";

            document.querySelector(".lower-div").append(cssProperty);
            document.querySelector(".lower-div").append(cssValue);

            let setCss = document.createElement("button");
            setCss.classList.add("set-css");
            setCss.textContent = "Set CSS";
            document.querySelector(".lower-div").append(setCss);
            setCss.addEventListener("click", function () {
                style += `${cssProperty.value}: ${cssValue.value};`;

                let showedCss = `${cssProperty.value}: ${cssValue.value};`;
                let cssCode = document.createElement("code");
                cssCode.textContent += showedCss;
                document.querySelector(".show-css").append(cssCode);

                document.querySelector(".lower-div").removeChild(cssProperty);
                document.querySelector(".lower-div").removeChild(cssValue);
                document.querySelector(".lower-div").removeChild(setCss);
                addCss.disabled = false;
            })

        })


        let set = document.createElement("button");
        set.textContent = "Done";
        document.querySelector(".show-css").insertAdjacentElement("afterend", set);
        set.addEventListener("click", function () {
            div.textContent = input.value;
            div.style = style;
            document.querySelector(".divContainer").append(div);
            document.querySelector(".divContainer").removeChild(onDiv);
            createButton.disabled = false;
        })
    }

    if (selectTag.value === option2.textContent) {
        let img = document.createElement("img");

        let onDiv = document.createElement("div");
        onDiv.classList.add("onScreen");
        document.querySelector(".divContainer").append(onDiv);

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

        document.querySelector(".onScreen").append(input);
        document.querySelector(".onScreen").append(inputWidth);
        document.querySelector(".onScreen").append(inputHeight);
        document.querySelector(".onScreen").append(set);

        set.addEventListener("click", function () {
            img.src = input.value;
            img.width = inputWidth.value;
            img.height = inputHeight.value;
            img.style = "object-fit: cover; object-position: center;";

            document.querySelector(".divContainer").append(img);
            document.querySelector(".divContainer").removeChild(onDiv);
            createButton.disabled = false;
        })
    }

    if (selectTag.value === option3.textContent) {
        let onDiv = document.createElement("div");
        onDiv.classList.add("onScreen");
        document.querySelector(".divContainer").append(onDiv);

        let input = document.createElement("input");
        input.type = "text";

        document.querySelector(".divContainer").append(input);
        createButton.disabled = false;
    }
}