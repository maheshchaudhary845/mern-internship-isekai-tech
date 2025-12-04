let a = 1;
let b = 2;
let str = "Hello World!";
let b2 = "2";

// console.log(a+b);
// console.log(a + str);

// console.log(a = str);
// console.log(a);

// console.log(a === str);

// console.log(b == b2);
// console.log(b === b2);

// console.log(a + b2);
// console.log(typeof(a + b2));

// console.log(a + b2 - b);
// console.log(typeof(a + b2 - b));

// console.log(a++ + ++a)





// Operators in JS:
// 
let a1 = 5;
let b1 = 10;
console.log(a1 && b1); // 0
console.log(a1 || b1); // 10























// Unicode is a universal system that assigns a unique number (code point) to every character in every language(English, Hindi, emojis, Chinese, symbols, etc)
// UTF(Unicode Transformation Format) is how these code points are stored in memory; 16 = because each unit of storage is 16-bits = 2 bytes.
// JavaScript uses UTF-16 to stores the character or strings; it works like if code point <= U+FFFF then it fits in one 16-bit unit;
// But if code point > U+FFFF(eg. emoji, rare symbols) then it requires two 16-bit units(called surrogate pair)
// let emoji = "😂";
// console.log(emoji.length);
// console.log(emoji[0]);
// console.log(emoji[1]);
// console.log(emoji[2]);
// console.log(emoji);

// let text1 = "a";
// let text2 = "A";
// console.log(text1 > text2); // true; but why? because JS compares UTF-16 numeric values
// console.log(text1.charCodeAt(0)); // 97
// console.log(text2.charCodeAt(0)); // 65