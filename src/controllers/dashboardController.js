const facilityService = require('../services/facilityService');
const activityService = require('../services/activityService');
const memberService = require('../services/memberService');
const registrationService = require('../services/registrationService');
const render = require('../core/renderer');

async function getDashboard(req, res) {
    try {
        const facilities = await facilityService.getFacilities();
        const activities = await activityService.getActivities();
        const members = await memberService.getMembers();
        const registrations = await registrationService.getRegistrations();

        render(res, 'pages/dashboard.ejs', {
            facilities,
            activities,
            members,
            registrations
        });

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}

module.exports = {
    getDashboard
};