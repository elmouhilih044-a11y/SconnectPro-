const http = require('http');
const router = require('./core/router');
const waitingListService= require('./services/waitingListService')

const server = http.createServer((req, res) => {
    router.lookup(req, res);
})

setInterval(async()=>{
    try{
        await waitingListService.expirePromotions()
    }catch(error){
        console.error('Erreur lors de l expiration des promotions :' ,error)
    }
},60000);

server.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});