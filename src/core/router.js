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
function route(method, path, handler) {
    router.on(method, path, (req, res, params, store, searchParams) => {
        req.params = params;
        req.query = searchParams;
        handler(req, res);
    });
}

router.on('GET', '/public/*', serveStaticFile)

router.on('GET', '/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Accueil</h1>')
});


route('GET', '/facilities', facilityController.getFacilities)
route('GET', '/facilities/:id', facilityController.getFacility)
route('POST', '/facilities', facilityController.addFacility)
route('PUT', '/facilities/:id', facilityController.editFacility)
route('DELETE', '/facilities/:id', facilityController.removeFacility)

route('GET', '/associations', associationController.getAssociations)
route('GET', '/associations/:id', associationController.getAssociation)
route('POST', '/associations', associationController.addAssociation)
route('PUT', '/associations/:id', associationController.editAssociation)
route('DELETE', '/associations/:id', associationController.removeAssociation)

route('GET', '/activities', activityController.getActivities)
route('GET', '/activities/:id', activityController.getActivity)
route('POST', '/activities', activityController.addActivity)
route('PUT', '/activities/:id', activityController.editActivity)
route('DELETE', '/activities/:id', activityController.removeActivity)

route('GET', '/registrations', registrationController.getRegistrations)
route('GET', '/registrations/new', registrationController.newRegistrationForm) 
route('GET', '/registrations/:id', registrationController.getRegistration)
route('POST', '/registrations', registrationController.addRegistration)
route('DELETE', '/registrations/:id', registrationController.removeRegistration)

route('GET', '/waiting-list', waitingListController.getWaitingList)
route('GET', '/waiting-list/:id', waitingListController.getWaiting)
route('POST', '/waiting-list', waitingListController.addWaiting)
route('PUT', '/waiting-list/:id', waitingListController.editWaiting)
route('DELETE', '/waiting-list/:id', waitingListController.removeWaiting)

route('GET', '/members', memberController.getMembers)
route('GET', '/members/:id', memberController.getMember)
route('POST', '/members', memberController.addMember)
route('PUT', '/members/:id', memberController.editMember)
route('DELETE', '/members/:id', memberController.removeMember)

route('GET', '/families', familyController.getFamilies)
route('GET', '/families/:id', familyController.getFamily)
route('POST', '/families', familyController.addFamily)
route('PUT', '/families/:id', familyController.editFamily)
route('DELETE', '/families/:id', familyController.removeFamily)

module.exports = router;