const familyService=require('../services/familyService');
async function getFamilies(req,res){
    try{
        const families=await familyService.getFamilies();
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(families))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function getFamily(req,res){
    try{
        const family=await familyService.getFamily(req.params.id)
        if(!family){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            return res.end('Famille introuvable')
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(family));
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function addFamily(req,res){
    let body='';
    req.on('data',(part)=>{
        body+=part;
    });
    req.on('end',async()=>{
        try{
            const familyData=JSON.parse(body)
            const family=await familyService.addFamily(familyData)
            res.writeHead(201,{
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify(family))
        }catch(error){
            console.error(error)
            res.writeHead(500,{
                'Content-Type':'text/plain'
            })
            res.end('Erreur serveur')
        }
    });
}
async function editFamily(req,res){
    let body='';
    req.on('data',(part)=>{
        body+=part;
    })
    req.on('end',async()=>{
        try{
            const familyData=JSON.parse(body)
            const family=await familyService.editFamily(req.params.id,familyData)
            if(!family){
                res.writeHead(404,{
                    'Content-Type':'text/plain'
                });
                return res.end('Famille introuvable')
            }
            res.writeHead(200,{
                'Content-Type':'application/json'
            });
            res.end(JSON.stringify(family));
        }catch(error){
            console.error(error)
            res.writeHead(500,{
                'Content-Type':'text/plain'
            })
            res.end('Erreur serveur');
        }
    })
}

async function removeFamily(req,res){
    try{
        const family=await familyService.removeFamily(req.params.id)
        if(!family){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            return res.end('Famille introuvable')
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        })
        res.end(JSON.stringify(family))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        })
        res.end('Erreur serveur');
    }
}

module.exports={
    getFamilies,
    getFamily,
    addFamily,
    editFamily,
    removeFamily
}