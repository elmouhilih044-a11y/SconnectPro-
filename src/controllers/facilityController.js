const facilityService = require('../services/facilityService');
async function getAllFacilities(req, res) {
    try {
        const facilities = await facilityService.getAllFacilities();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(facilities));
    } catch (error) {
        console.error(error);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function createFacility(req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const facility = await facilityService.createFacility(data);
            res.writeHead(201, {
                'Content-Type': 'application/json'
               });
            res.end(JSON.stringify(facility));

        } catch (error) {
            console.error(error);

            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('Erreur serveur');
        }
    });
} 

async function updateFacility(req, res) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const facility = await facilityService.updateFacility(
                req.params.id,
                data
            );
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(facility));
        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('Erreur serveur');
        }
    });
}

async function deleteFacility(req, res) {
    try {
        const facility = await facilityService.deleteFacility(
            req.params.id
        );
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
        console.error(error);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Erreur server');
    }
}
module.exports = {
    getAllFacilities,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility
};