const http = require("http");

const port = 3000;

const app = http.createServer((req, res)=>{
    res.end("Hello from server, done changes");
});

app.listen(port, "127.0.0.1", ()=>{
    console.log("server is running on http://127.0.0.1:"+port);
})