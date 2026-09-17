const http= require('http');
const router= require('./core/router')
const server=http.createServer((req,res)=>{
       router.lookup(req,res);
});
server.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});