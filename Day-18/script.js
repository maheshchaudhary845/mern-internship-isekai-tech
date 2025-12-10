// function hello(a){
//     console.log("Hello");
//     return a;
// }

// hello();
// console.log(hello()); 
// Here function didn't throw any error, if we do not specify the argument in the function hello(); the function will execute but if we try to print it, it will give output - undefined.


// // Recursion Function
// function abc(n){
//     if(n==4){
//         return n;
//     }
//     return abc(n+1);
// }
// console.log(abc(2));



// // Anonymous Function / Arrow function 
// let data = ()=>{
//     console.log("hello");
// }
// data();


// // Self-Executing Function
// (()=>{
//     console.log("Hello");
// })();



// // Callback Function
// // A function that takes another function as a parameter
// function greet(name, callback){
//     console.log("Good Morning " + name);
//     callback(name)
// }
// // this is actual callback func
// function sayGoodbye(naam){
//     console.log("Good Bye! " + naam);
// }
// // Calling greet with sayGoodbye as a callback
// greet("Minni", sayGoodbye);

// // OR ANOTHER WAY TO WRITE THIS SAME FUNCTION
// function greetUser(name, callback){
//     callback(name);
//     console.log("Good Morning " + name);
// }
// greetUser("Harry", (naam)=>{
//     console.log("Good Bye! " + naam);
// })




// Normal function vs Arrow function
// Normal function: CALLER decides this; Normal function creates a new this everytime it is called.
// Arrow function: BIRTHPLACE decides this; Arrow function remembers the this from the place it was born.
// Inside object normal function:-
// const obj = {
//     name: "Minni",
//     show: function(){
//         console.log(this.name);
//     }
// }
// obj.show(); // Minni this = obj because obj called it
// let a = obj.show;
// a(); // undefined this = global(not obj)

// // Arrow Function:-
// const obj2 = {
//     name: "Minni 2",
//     show: ()=>{
//         console.log(this.name);
//     }
// }
// obj2.show(); // undefined; Arrow function do not take this from the object, they take from the place where they were created (global/script/module)
// “But the arrow function is inside the object, then why not this = object?”
// Because:
// 🚨 OBJECT does NOT create a new this in JavaScript.
// Only functions create their own this (normal functions).
// An object literal is NOT a function, so it does NOT create a this.


// 2) INSIDE EVENTS
// HTML
// <button id="btn">Click</button>

// JS — Normal Function
// btn.addEventListener("click", function () {
//     console.log(this); // <button>
// });

// Visualization
// button clicked --> event handler called
//  → this = button element

// Arrow Function in Event
// btn.addEventListener("click", () => {
//     console.log(this); // NOT the button
// });


// Arrow function does NOT bind this to DOM element.

// Visualization
// arrow → this comes from outside (usually window)

// 🎯 Result:
// Normal function → perfect for events
// Arrow function → NOT suitable when you need this = element



// // 3) INSIDE CLASSES
// class A{
//     name = "Mini";
//     showNormal(){
//         console.log(this.name);
//     }
//     showArrow = ()=>{
//         console.log(this.name);
//     }
// }
// const object = new A();
// // // object.showNormal();
// // const o = object.showNormal;
// // o();

// object.showArrow();
// const o2 = object.showArrow;
// o2();

// Normal method:
// A.prototype.showNormal → this depends on caller

// Arrow method:
// Stored directly in object and this permanently = instance


// // 4) INSIDE TIMERS / CALLBACKS
// // Normal function:
// function hey(callback){
//     console.log(this.name); // undefined
//     callback();
// }
// // let hey = (callback)=>{
// //     console.log(this.name); // undefined
// //     callback();
// // }
// const obj = {
//     name: "Mini",
//     show(){
//         console.log(this.name); // Mini
//         hey(function(){
//             console.log(this.name); // undefined
//         });
//         hey(()=>{
//             console.log(this.name); // Mini
//         });
//         // setTimeout(function(){
//         //     console.log(this.name); // undefined
//         // }, 1000);
//     }
// };
// obj.show(); // undefined; Because the callback inside setTimeout is called by window, not obj.

// let counter = {
//   value: 1,
//   inc: function () {
//     setTimeout(() =>{
//       console.log(this.value);
//     }, 100);
//   }
// };

// counter.inc();





// // CLASS IN JAVASCRIPT
// class A{
//     name = "Minni";
//     // Here we can't directly write keyword function, class method must be written without function keyword.
//     show(){
//         console.log(this.name);
//     }
//     // We can also write like this, and now here we can write function keyword like this.
//     show = function(){
//         console.log("Another way to create function ");
//     }
// }