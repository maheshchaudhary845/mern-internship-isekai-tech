let pattern = "";
for(let i=0; i<5; i++){
    // let pattern = "";
    for(let j=0; j<=i; j++){
        pattern += "* ";
    }
    pattern += "\n";
    // console.log(pattern);
}
console.log(pattern);





for(let i = 0; i < 5; i++){
    let pattern = "";
    for(let j=4; j > i; j--){
        pattern += " ";
    }
    for(let k=0; k<=i; k++){
        pattern += "*";
    }
    console.log(pattern);
}