const http= require('http');

const server=http.createServer((req,res)=>{
    console.log(req.method)
    console.log(req.url)
    res.end("Bonjour")
})
server.listen(3000)