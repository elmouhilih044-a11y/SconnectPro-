const registrationService = require('../services/registrationService');
const activityService = require('../services/activityService');
const memberService = require('../services/memberService');
const render = require('../core/renderer');

async function getRegistrations(req, res) {
    try {
        const registrations = await registrationService.getRegistrations();

        render(res, 'pages/registrations.ejs', {
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


async function getRegistration(req, res) {
    try {
        const registration = await registrationService.getRegistration(req.params.id);

        if (!registration) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Inscription introuvable');
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(registration));

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}


async function addRegistration(req, res) {
    let body = '';

    req.on('data', (part) => {
        body += part;
    });

    req.on('end', async () => {
        try {
            // Formulaire HTML = application/x-www-form-urlencoded
            const registrationData = Object.fromEntries(
                new URLSearchParams(body)
            );

            console.log('Registration data:', registrationData);

            // Vérification member_id
            if (!registrationData.member_id) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                });

                return res.end('member_id est obligatoire');
            }

            // Vérification activity_id
            if (!registrationData.activity_id) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                });

                return res.end('activity_id est obligatoire');
            }

            const result = await registrationService.addRegistration(
                registrationData
            );

            const statusCode =
                result.status === 'confirmed' ? 201 : 200;

            res.writeHead(statusCode, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(result));

        } catch (error) {
            console.error(error);

            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });

            res.end(error.message);
        }
    });
}


async function removeRegistration(req, res) {
    try {
        const registration =
            await registrationService.removeRegistration(req.params.id);

        if (!registration) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Inscription introuvable');
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(registration));

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}


async function newRegistrationForm(req, res) {
    try {
        const activityId = req.query.activity_id;
        const memberId = req.query.member_id;

        // Vérifier que les IDs existent dans l'URL
        if (!activityId) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });

            return res.end('activity_id est obligatoire');
        }

        if (!memberId) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });

            return res.end('member_id est obligatoire');
        }

        // Récupérer activité et membre
        const activity =
            await activityService.getActivity(activityId);

        const member =
            await memberService.getMember(memberId);

        // Vérifier que l'activité existe
        if (!activity) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Activité introuvable');
        }

        // Vérifier que le membre existe
        if (!member) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Membre introuvable');
        }

        // Afficher la page checkout
        render(res, 'pages/checkout.ejs', {
            activity,
            member,
            finalPrice: null,
            familyMemberCount: 1
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
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration,
    newRegistrationForm
};