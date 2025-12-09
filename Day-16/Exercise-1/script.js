let numbers = [23, 12, 45, 39, 28, 39, 23, 1, 32, 38];

for(let i=0; i<numbers.length; i++){
    if(numbers[i] % 2 === 0){
        console.log(numbers[i] + " is an even number");
    } else{
        console.log(numbers[i] + " is an odd number");
    }
}