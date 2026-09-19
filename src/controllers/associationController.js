const associationService = require('../services/associationService')

async function getAssociations(req, res) {
    try {
        const associations = await associationService.getAssociations();

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(associations));

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}

module.exports = {
    getAssociations
};