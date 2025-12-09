let str = prompt("Enter any word");
let reversed = "";

for(let i=str.length-1; i>=0; i--){
    reversed += str[i];
}
console.log(reversed);

if(str === reversed){
    console.log(str + " is a palindrome");
} else{
    console.log(str + " is not a palindrome");
}