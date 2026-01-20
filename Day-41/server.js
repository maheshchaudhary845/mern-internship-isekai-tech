const fs = require("fs");
const http = require("http");
const ejs = require('ejs');

let html = "";
let css = "./views/"

const app = http.createServer((req, res) => {
    let data = {
        name: "",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, a!"
    }
    switch (req.url) {
        case "/":
            html = './views/home.ejs'
            if (req.method === "POST") {
                let rawData = '';
                req.on('data', (chunks) => {
                    rawData += chunks;
                })
                req.on("end", () => {
                    let formData = rawData.split("=").pop().replaceAll("+", " ");
                    console.log("Form data: ", formData)
                    data.name = formData;
                    console.log(data);

                    ejs.renderFile(html, data, (err, htmlData) => {
                    res.writeHead(200, { 'content-type': 'text/html' })
                    res.end(htmlData);
                })
                })
            }
            else {
                ejs.renderFile(html, data, (_err, htmlData) => {
                    res.writeHead(200, { 'content-type': 'text/html' })
                    res.end(htmlData);
                })
            }
            break;
        case "/about":
            html = './views/about.html'
            res.writeHead(200, { 'Content-Type': 'text/html' })
            const dataAbout = fs.readFileSync(html)
            res.end(dataAbout)
            break;
        case "/contact":
            html = './views/contact.html'
            res.writeHead(200, { 'Content-Type': 'text/html' })
            const dataContact = fs.readFileSync(html)
            res.end(dataContact)
            break;
        default:
            if (req.url.endsWith('.css')) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                const cssData = fs.readFileSync(css + req.url);
                res.end(cssData);
            }
    }
})

app.listen(3000, "127.0.0.1", () => {
    console.log("server is running on port http://127.0.0.1:3000")
})