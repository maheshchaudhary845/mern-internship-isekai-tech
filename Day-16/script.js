let arr = [23, 21, 85, 32, 14, 95, 10, 9, 2, 4, 58, 29];
let str = "Hello World!";
let obj = {
    name: "Mahesh",
    Address: {
        city: "Paonta Sahib",
        state: "Himachal Pradesh",
    },
    age: 24
};
// for loop: mostly used and useful when we know how many times to repeat before starting something.
// for(let i=0; true; i++){
//     console.log(i);
// }


// for-of loop: It is used to print the values of array/strings.
for(let values of arr){
    console.log(values);
}
for(let values of str){
    console.log(values);
}


// for-in loop: It is used to print the object keys.
for(let key in obj){
    console.log(key, obj[key]);
    console.log(key + ": " + obj[key]);
    console.log(key + ": " + JSON.stringify(obj[key]));
}



let stringify = {
    "name": "xyz",
    "Address": {
        "city": "abc",
        "state": "jkl",
    },
    "age": "21",
}
console.log(stringify);
stringify = JSON.stringify(stringify);
console.log(stringify);
console.log(JSON.parse(stringify));



// while loop: similar to for loop, but it is useful when we don't know how many times to repeat; depends on a condition
let health = 100;
let level = 1;
while(health > 0){
    console.log("Player Health: "+ health);
    console.log("Level: " + level);
    let damage = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

    health -= damage;
    console.log("Got " + damage + " damage");
    // health--;
    level++;
}
console.log("Game Over - Player died");


// do-while loop: first the value or block is executed then the condition will get checked
let i = 0;
do{
    console.log(i);
} while(i > 1);