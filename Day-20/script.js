// let obj = {
//     name: "first",
//     obj2: {
//         name: "second",
//         hey(){
//             console.log(this.name);
//         }
//     }
// }

// obj.obj2.hey();




// // Abstraction / Encapsulation
// class A {
//     #age = 20;
//     hello(){
//         console.log(this.#age);
//     }
// }

// obj = new A();
// console.log(obj.age);

// obj.hello();





// // Exception Handling
// let a = 5;
// try{
//     console.log(a/b); // 5/0 = infinity; it is not an error in JS
// }
// catch(err){
//     // throw new Error("Custom Error"); // It should be write in function like if I create divide function and there I can check the condition if b===0 then I will throw this error and in try block I simply call the divide function
//     console.log("Error aa gya: ", err.message);

// }
// finally{
//     console.log("I will print for sure");
// }

// function testJS() {
//     try {
//         // console.log("Hello from try"); // Now if I write this then it will return
//         // Hello from try
//         // Finally runs in JS
//         // From finally
//         return "From try";
//     } finally {
//         console.log("Finally runs in JS");
//         return "From finally"; // Overrides try's return
//     }
// }

// console.log(testJS()); // Output:
// // Finally runs in JS
// // From finally
