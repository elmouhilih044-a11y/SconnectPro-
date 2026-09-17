const findMyWay=require('find-my-way');
const router= findMyWay({
    defaultRoute:(req,res)=>{
        res.writeHead(404,{
            'Content-Type':'text/html'
        })
          res.end('<h1>404,not found</h1>')
    }
})
router.on('GET','/',(req,res)=>{
res.writeHead(200,{
     'Content-Type':'text/html'
})
res.end('<h1>accueil</h1>')
})


router.on('GET', '/activities', (req, res) => {
  res.writeHead(200, {
     'Content-Type': 'text/plain'
     });
  res.end('Liste des activités');
});

router.on('GET', '/activities/:id', (req, res, params) => {
  res.writeHead(200, { 
    'Content-Type': 'text/plain' 
});
  res.end(`Détail de l'activité ${params.id}`);
});

router.on('POST', '/registrations', (req, res) => {
  res.writeHead(201, { 
    'Content-Type': 'text/plain'
 });
  res.end('Inscription crée');
});
module.exports=router