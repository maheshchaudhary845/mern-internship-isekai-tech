// NODE JS 19-01-2026

// let a = 5;
// let b = 8;

// function sum(a, b){
//     return a+b;
// }

// console.log(sum(a, b));

// for(let i = 0; i<a; i++){
//     console.log(i);
// }

// const os = require("os");
// console.log(os.freemem());
// console.log(os.platform(), os.release(), os.arch(), os.type());


// const path = require("path")
// console.log(path.dirname("D:/Coding/Internship/Isekai Tech/Day-40/script.js"));
// console.log(path.extname("hello.index.js"));
// console.log(path.extname(".js"));
// console.log(path.format({
//     root: "/ignored",
//     dir: "/a/b/dir",
//     base: "index.html"
// })) 
// // `root` will be used if `dir` is not specified.
// // `name` + `ext` will be used if `base` is not specified.
// console.log(path.join("root//", "/////base"));
// console.log(path.normalize("/////a//////////////b"));


const fs = require("fs");
// async
fs.writeFileSync("text1.txt", "Hello world");

const data = fs.readFileSync("text1.txt");
console.log(data.toString());
// sync
fs.writeFile("text2.txt", "Hello World 2", (err, data)=>{
    if(err) console.error(err)
        console.log("text2 File created successfully!")
})
fs.readFile("text2.txt", (err, data)=>{
    if(err) console.error(err)
        console.log(data.toString());
})

fs.appendFile("text2.txt", "I am updated using appendFile", (err, data)=>{
    if(err) console.error(err)
        console.log("Inside appendFile");
})

// unlink() for deletion and rename() for renaming