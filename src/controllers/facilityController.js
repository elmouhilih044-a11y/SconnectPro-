const facilityService = require('../services/facilityService');

async function getFacilities(req, res) {
    try {
        const facilities = await facilityService.getFacilities();
        res.writeHead(200, {
            'Content-Type':'application/json'
        })
        res.end(JSON.stringify(facilities))
    } catch (error) {
        console.error(error);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end('Erreur serveur');
    }
}
async function getFacility(req, res) {
    try {
        const facility = await facilityService.getFacility(req.params.id);
        if (!facility) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            return res.end('Facility introuvable');
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(facility));
    } catch (error) {
        console.error(error)
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur');
    }
}

async function addFacility(req,res) {
    let body = ''
    req.on('data',(part) => {
        body += part
    });
    req.on('end', async() => {
        try {
            const facilityData = JSON.parse(body)
            const facility = await facilityService.addFacility(facilityData)
            res.writeHead(201, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(facility))
        } catch (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end('Erreur serveur');
        }
    });
}

async function editFacility(req, res) {
    let body = '';
    req.on('data',(part) => {
        body += part
    });
    req.on('end', async () => {
        try {
            const facilityData = JSON.parse(body)
            const facility = await facilityService.editFacility(
                req.params.id,facilityData);
            if (!facility) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                return res.end('Facility introuvable');
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(facility));
        } catch (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end('Erreur serveur')
        }
    });
}

async function removeFacility(req,res) {
    try {
        const facility = await facilityService.removeFacility(req.params.id)
        if (!facility) {
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            })
            return res.end('Facility introuvable');
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(facility))
    } catch (error) {
        console.error(error)
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur');
    }
}

module.exports = {
    getFacilities,
    getFacility,
    addFacility,
    editFacility,
    removeFacility
};