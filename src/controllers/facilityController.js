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

module.exports = {
    getAllFacilities
};