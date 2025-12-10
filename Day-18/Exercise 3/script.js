function addition(arr, counter=0, result=0){
    if(arr.length == counter){
        return result;
    }
    result += arr[counter];
    counter++;
    return addition(arr, counter, result);
}
let arr = [1, 3, 5, 2, 4, 10];
console.log(addition(arr));