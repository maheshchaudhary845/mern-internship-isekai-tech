$.ajax({
    url: 'https://dog.ceo/api/breeds/image/random',
    success: (data) => {
        console.log(data.message)
    }
})