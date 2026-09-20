const registrationService= require('../services/registrationService');

async function getRegistrations(req, res){
    try {
        const registrations= await registrationService.getRegistrations()
        res.writeHead(200,{
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(registrations));
    } catch (error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        })
        res.end('Erreur serveur')
    }
}
async function getRegistration(req, res){
    try {
        const registration= await registrationService.getRegistration(req.params.id);
        if (!registration) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            return res.end('Inscription introuvable')
        }
        res.writeHead(200,{
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(registration));
    } catch (error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur')
    }
}
async function addRegistration(req, res){
    let body = '';
    req.on('data', (part)=> {
        body += part;
    });
    req.on('end',async()=> {
        try {
            const registrationData= JSON.parse(body);
            const registration=
                await registrationService.addRegistration(
                    registrationData
                );
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(registration));
        } catch (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('Erreur serveur')
        }
    });
}
async function removeRegistration(req, res){
    try {
        const registration= await registrationService.removeRegistration(req.params.id);
        if (!registration) {
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            return res.end('Inscription introuvable');
        }

        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(registration));
    } catch (error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur')
    }
}
module.exports= {
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration
};