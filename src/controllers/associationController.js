const associationService= require('../services/associationService');

async function getAssociations(req, res){
    try{
        const associations= await associationService.getAssociations()
        res.writeHead(200,{
            'Content-Type':'application/json'
        })
        res.end(JSON.stringify(associations))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur')
    }
}
async function getAssociation(req, res){
    try {
        const association= await associationService.getAssociation(
            req.params.id
        )
        if(!association){
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            });
            return res.end('Association introuvable')
        }
        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(association))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        })
        res.end('Erreur serveur')
    }
}
async function addAssociation(req, res){
    let body = '';
    req.on('data',(part) => {
        body += part;
    })
    req.on('end',async()=> {
        try{
            const associationData= JSON.parse(body)
            const association=await associationService.addAssociation(associationData)
            res.writeHead(201,{
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(association))
        }catch(error){
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('Erreur serveur')
        }
    })
}
async function editAssociation(req, res){
    let body = '';
    req.on('data',(part)=> {
        body += part
    })
    req.on('end', async () => {
        try{
            const associationData = JSON.parse(body)
            const association =
                await associationService.editAssociation(
                    req.params.id,
                    associationData
                )
            if(!association) {
                res.writeHead(404,{
                    'Content-Type': 'text/plain'
                })
                return res.end('Association introuvable')
            }
            res.writeHead(200, {
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify(association))
        }catch (error){
            console.error(error)
            res.writeHead(500, {
                'Content-Type':'text/plain'
            })
            res.end('Erreur serveur')
        }
    });
}
async function removeAssociation(req, res){
    try{
        const association = await associationService.removeAssociation(req.params.id);
        if (!association) {
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            });
            return res.end('Association introuvable')
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });

        res.end(JSON.stringify(association))
    }catch (error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur')
    }
}

module.exports={
    getAssociations,
    getAssociation,
    addAssociation,
    editAssociation,
    removeAssociation
}