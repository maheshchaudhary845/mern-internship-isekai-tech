function getProduct(){
    $.ajax({
        url: "https://dummyjson.com/products",
        method: "POST",
        data:{username: 'emilys',
            password: 'emilyspass'},
        

        // xhrFields: {
        //     responseType: "arraybuffer",
        // },

        dataType: "json",
        success: function(res){
            console.log(res.products);
        },

        error: function(err){
            console.error(err);
        }
    })
}