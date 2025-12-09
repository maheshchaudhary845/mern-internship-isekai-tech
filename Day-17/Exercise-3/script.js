let rows = prompt("How many rows do you want to insert in a star pattern?");

for(let i=0; i<rows; i++){
    let pattern = "";
    for(let j=0; j<rows-(i+1); j++){
        pattern += " ";
    }
    for(let k=0; k<=i; k++){
        pattern += "*";
    }
    console.log(pattern);
}