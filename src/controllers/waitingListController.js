const waitingListService= require('../services/waitingListService');

async function getWaitingList(req, res){
    try{
        const waitingList= await waitingListService.getWaitingList();
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(waitingList));
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function getWaiting(req, res){
    try{
        const waiting = await waitingListService.getWaiting(req.params.id);
        if (!waiting) {
            res.writeHead(404,{
                'Content-Type':'text/plain'
            })
            return res.end('Inscription en attente introuvable');
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(waiting));
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');$
    }
}

async function addWaiting(req, res){
    let body= '';
    req.on('data',(part)=>{
        body += part
    });

    req.on('end',async()=>{
        try{
            const waitingData= JSON.parse(body)

            const waiting= await waitingListService.addWaiting(waitingData);
            res.writeHead(201,{
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(waiting));
        } catch(error){
            console.error(error)
            res.writeHead(500,{
                'Content-Type':'text/plain'
            })
            res.end('Erreur serveur')
        }
    });
}
async function editWaiting(req, res){
    let body = '';

    req.on('data',(part)=>{
        body += part;
    });
    req.on('end',async()=> {
        try{
            const waitingData= JSON.parse(body);

            const waiting= await waitingListService.editWaiting(req.params.id,waitingData)
            if (!waiting) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                return res.end('Inscription en attente introuvable');
            }

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(waiting));
        } catch (error) {
            console.error(error);

            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('Erreur serveur');
        }
    });
}

async function removeWaiting(req, res){
    try{
        const waiting= await waitingListService.removeWaiting(req.params.id);

        if (!waiting) {
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            return res.end('Inscription en attente introuvable');
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(waiting));
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}
module.exports= {
    getWaitingList,
    getWaiting,
    addWaiting,
    editWaiting,
    removeWaiting
};