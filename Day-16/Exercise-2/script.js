let year = [1200, 4000, 2001, 2000, 3000, 1400, 1500, 1600];

for(let i=0; i<year.length; i++){
    if((year[i] % 4 === 0) && ((year[i] % 100 !== 0) || (year[i] % 400 === 0))){
        console.log(year[i] + " is a leap year");
    }
    else{
        console.log(year[i] + " is not a leap year");
    }
}