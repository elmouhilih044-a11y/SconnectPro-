const findMyWay = require('find-my-way');
const facilityController = require('../controllers/facilityController')
const router = findMyWay({
    defaultRoute: (req, res) => {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>404 - Page non trouvée</h1>')
    }
});
router.on('GET', '/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Accueil</h1>')
});
router.on('GET', '/activities', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Liste des activités')
});

router.on('GET', '/activities/:id', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(`Détail de l'activité ${req.params.id}`);
});
router.on('POST', '/registrations', (req, res) => {
    res.writeHead(201, {
        'Content-Type': 'text/plain'
    });

    res.end('Inscription créée')
});
router.on('GET', '/facilities', facilityController.getFacilities)
router.on('GET', '/facilities/:id', facilityController.getFacility)
router.on('POST', '/facilities', facilityController.addFacility)
router.on('PUT', '/facilities/:id', facilityController.editFacility)
router.on('DELETE', '/facilities/:id', facilityController.removeFacility)
module.exports = router;