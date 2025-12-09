let arr = prompt("Enter numbers as an input separated by commas eg 3,8,53,12");

arr = arr.split(",");

for(let i=0; i<arr.length; i++){
    if(arr[i] % 2 === 0){
        console.log(arr[i] + " is an even number");
    }
    else{
        console.log(arr[i] + " is an odd number")
    }
}
console.log(arr);