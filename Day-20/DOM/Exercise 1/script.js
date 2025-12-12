let bodyColor = prompt("What background color to the body you want?");

document.body.style.backgroundColor = bodyColor;

let div = document.createElement("div");
document.body.children[0].insertAdjacentElement("afterend", div);
// Three types are there
// insertAdjacentElement: used when creating elements using createElement();
// insertAdjacentHTML: You want to insert HTML markup quickly. parses HTML
// insertAdjacentText: You want to insert pure text, not HTML.
// we can insert at 4 places like in this case <h1></h1> if i write "afterend" then it will add after end tag </h1> ie after <h1></h1>, "beforeend" before </h1> tag ie in the end of h1, "afterbegin" add after <h1> ie starting of h1, "beforebegin" add above <h1> ie top of <h1></h1>


let str = prompt("Enter the string you want to insert inside h2");
try{
    if(str === null){
        throw new Error("Prompt was cancelled");
    }
    if(str.length !== 0){
        document.body.children[1].innerHTML = `<h2>${str}</h2>`;
    }else{
        throw new Error("You haven't provided any text into h2");
    }
} catch(err){
    console.log(err.message);
}