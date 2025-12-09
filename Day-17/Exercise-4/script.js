let operation = "";
let arr = [];
while(operation != 4){
    operation = prompt("What operation do you want to perform? \n Press 1 to Create/Insert array \n Press 2 to Read array \n Press 3 to Delete a particular item in an array \n Press 4 to Exit");

    if(operation == 1){
        let insert = prompt("Enter the array value");
        arr.push(insert);
        alert(arr);
    } else if(operation == 2){
        alert(arr);
    }else if(operation == 3){
        let dlt = prompt("Enter the item you want to delete from the array \n" + arr);
        arr = arr.filter(item => item != dlt);
        alert(arr);
    }else if(operation == 4){
        break;
    }
    else{
        alert("Please Enter a valid input!");
    }
}
