const findMyWay = require('find-my-way');
const facilityController = require('../controllers/facilityController')
const associationController=require('../controllers/associationController')
const activityController=require('../controllers/activityController')
const registrationController=require('../controllers/registrationController')
const waitingListController=require('../controllers/waitingListController');
const memberController=require('../controllers/memberController')
const familyController=require('../controllers/familyController')
const serveStaticFile = require('./staticFiles')


const router= findMyWay({
    defaultRoute: (req, res) => {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>404 - Page non trouvée</h1>')
    }
});
router.on('GET', '/public/*', serveStaticFile)

router.on('GET', '/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Accueil</h1>')
});


router.on('GET', '/facilities', facilityController.getFacilities)
router.on('GET', '/facilities/:id', facilityController.getFacility)
router.on('POST', '/facilities', facilityController.addFacility)
router.on('PUT', '/facilities/:id', facilityController.editFacility)
router.on('DELETE', '/facilities/:id', facilityController.removeFacility)

router.on('GET', '/associations', associationController.getAssociations)
router.on('GET', '/associations/:id', associationController.getAssociation)
router.on('POST', '/associations', associationController.addAssociation)
router.on('PUT', '/associations/:id', associationController.editAssociation)
router.on('DELETE', '/associations/:id', associationController.removeAssociation)

router.on('GET', '/activities', activityController.getActivities)
router.on('GET', '/activities/:id', activityController.getActivity)
router.on('POST', '/activities', activityController.addActivity)
router.on('PUT', '/activities/:id', activityController.editActivity)
router.on('DELETE', '/activities/:id', activityController.removeActivity)

router.on('GET', '/registrations', registrationController.getRegistrations)
router.on('GET', '/registrations/:id', registrationController.getRegistration)
router.on('POST', '/registrations', registrationController.addRegistration)
router.on('DELETE', '/registrations/:id', registrationController.removeRegistration)

router.on('GET', '/waiting-list', waitingListController.getWaitingList)
router.on('GET', '/waiting-list/:id', waitingListController.getWaiting)
router.on('POST', '/waiting-list', waitingListController.addWaiting)
router.on('PUT', '/waiting-list/:id', waitingListController.editWaiting)
router.on('DELETE', '/waiting-list/:id', waitingListController.removeWaiting)

router.on('GET', '/members', memberController.getMembers)
router.on('GET', '/members/:id', memberController.getMember)
router.on('POST', '/members', memberController.addMember)
router.on('PUT', '/members/:id', memberController.editMember)
router.on('DELETE', '/members/:id', memberController.removeMember)

router.on('GET', '/families', familyController.getFamilies)
router.on('GET', '/families/:id', familyController.getFamily)
router.on('POST', '/families', familyController.addFamily)
router.on('PUT', '/families/:id', familyController.editFamily)
router.on('DELETE', '/families/:id', familyController.removeFamily)

module.exports = router;