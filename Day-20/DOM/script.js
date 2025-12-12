let element = document.createElement("h2");
element.innerHTML="I am h2";
document.body.append(element);

document.body.innerHTML = document.body.innerHTML + "<h3>I am h3</h3>"

document.body.innerHTML = document.body.innerHTML + "<div id=container></div>";

document.body.children[4].innerHTML = "<p>I am Paragraph</p>"; // because script is at number 2 according to this program
document.body.children[4].children[0].style.fontSize="30px";
document.body.children[4].children[0].style.backgroundColor="blue";
document.body.children[4].children[0].style = "color: red; background-color: black;";  // this will override above styles because here we are defining the style and assigning multiple values to this. 