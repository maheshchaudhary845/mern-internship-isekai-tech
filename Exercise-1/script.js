let age = prompt("Enter your age: ");
let country = prompt("Enter your country: ");
country = country.toLowerCase();
if(country === "india" && age >= 18){
    alert("You can vote!");
}
else if(country === "usa" && age >= 21){
    alert("You can vote!");
}
else if(country === "japan" && age >= 25){
    alert("You can vote!");
}
else if(age >= 19){
    alert("You can vote!");
}
else{
    alert("Sorry you can't vote!!!");
}