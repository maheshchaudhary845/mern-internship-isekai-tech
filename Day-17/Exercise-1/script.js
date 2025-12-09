let input = prompt("How many inputs you want to insert in an array?");
let arr = [];
if(!isNaN(input)){
    for(let i=1; i<=input; i++){
        arr += prompt("Enter " + i + " value");
        arr += " ";
    }
} else{
    alert("Please enter a valid number!!!");
}
arr = arr.split(" ");
arr.pop();

for(let i=0; i<arr.length; i++){
    if(arr[i] % 2 === 0){
        console.log(arr[i] + " is an even number");
    }
    else{
        console.log(arr[i] + " is an odd number")
    }
}
console.log(arr);