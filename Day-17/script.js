function sum(arr){
    let res = 0;
    for(let i=0; i<arr.length; i++){
        res += arr[i];
    }
    return res;
}

function subtraction(arr){
    let res = 0;
    for(let i=0; i<arr.length; i++){
        if(i === 0){
            res = arr[i];
            continue;
        }
        res -= arr[i];
    }
    return res;
}

function multiplication(arr){
    let res = 1;
    for(let i=0; i<arr.length; i++){
        res *= arr[i];
    }
    return res;
}

function divide(a, b){
    return a/b;
}

function remainder(a, b){
    return a % b;
}

function exponent(a, b){
    return a**b;
}

function factorial(a){
    let fact = 1;
    for(let i=1; i<=a; i++){
        fact *= i;
    }
    return fact;
}


function arrOfInputs(action, func){
    let count = prompt("On how many inputs do you want to perform "+ action +"?");
        let inputs = [];
        for(let i=1; i<=count; i++){
            let number = Number(prompt("Input " + i));
            if(!isNaN(number)){
                inputs.push(number);
            }
            else{
                alert("Please enter a number value!");
            }
        }
        let result = func(inputs);
        alert("Result = "+result);
}


let operation = "";
while(operation != 6){
    operation = prompt("What operation do you want to perform? \n Press 1 to perform Addition \n Press 2 to perform Subtraction \n Press 3 to perform Multiplication \n Press 4 to perform Division \n Press 5 to perform Remainder \n Press 6 to perform Exponentiation \n Press 7 to perform Factorial \n Press 8 to Exit");

    if(operation == 1){
        arrOfInputs("sum", sum);
    }

    if(operation == 2){
        arrOfInputs("subtraction", subtraction);
    }

    if(operation == 3){
        arrOfInputs("multiplication", multiplication);
    }

    if(operation == 4){
        let a = prompt("Enter first number");
        let b = prompt("Enter second number");
        let result = divide(a, b);
        alert("Result = "+result);
    }
    if(operation == 5){
        let a = prompt("Enter first number");
        let b = prompt("Enter second number");
        let result = remainder(a, b);
        alert("Result = "+result);
    }
    if(operation == 6){
        let a = prompt("Enter the number");
        let b = prompt("Enter the power");
        let result = exponent(a, b);
        alert("Result = "+result);
    }
    if(operation == 7){
        let a = prompt("Enter the number to perform Factorial");
        let result = factorial(a);
        alert("Result = "+result);
    }
    if(operation == 8){
        break;
    }
}