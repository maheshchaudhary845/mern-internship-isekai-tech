// Simple Promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let success = true;
        if (success) {
            resolve("Success");
        } else {
            reject("Failure");
        }
    }, 1000)
})

promise
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.error(err);
    })
    .finally(()=>{
        console.log("Promise completed (success or failure)");
    })


// Chaining Promise
function asyncTask(value){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(value * 2)
        },1000)
    })
}

asyncTask(2).then(res=>{
    console.log(res);
    return asyncTask(4);
})
.then(res=>{
    console.log(res);
    return asyncTask(8);
})
.then(res=>{
    console.log(res);
})