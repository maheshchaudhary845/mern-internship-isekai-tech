function fibonacci(n, first=0, second=1, sequence=[]){
    if(sequence.length == n){
        return sequence;
    }
    let result = first + second;
    sequence.push(first);
    return fibonacci(n, second, result, sequence);
}

console.log(fibonacci(10));