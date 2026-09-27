const registrationService = require('../services/registrationService');
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
            'Content-Type': 'text/plain; charset=utf-8'
        });

        res.end('Erreur serveur');
    }
}


async function getRegistration(req, res) {
    try {
        const registration = await registrationService.getRegistration(req.params.id);

        if (!registration) {
            res.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8'
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
            'Content-Type': 'text/plain; charset=utf-8'
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
            const registrationData = Object.fromEntries(
                new URLSearchParams(body)
            );

            if (!registrationData.member_id) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });

                return res.end('member_id est obligatoire');
            }

            if (!registrationData.activity_id) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain; charset=utf-8'
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
                'Content-Type': 'text/plain; charset=utf-8'
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
                'Content-Type': 'text/plain; charset=utf-8'
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
            'Content-Type': 'text/plain; charset=utf-8'
        });

        res.end('Erreur serveur');
    }
}


async function newRegistrationForm(req, res) {
    try {
        const activityId = req.query.activity_id;
        const memberId = req.query.member_id;

        if (!activityId) {
            res.writeHead(400, {
                'Content-Type': 'text/plain; charset=utf-8'
            });

            return res.end('activity_id est obligatoire');
        }

        if (!memberId) {
            res.writeHead(400, {
                'Content-Type': 'text/plain; charset=utf-8'
            });

            return res.end('member_id est obligatoire');
        }

        const quote = await registrationService.getQuote(memberId, activityId);

        render(res, 'pages/checkout.ejs', {
            activity: quote.activity,
            member: quote.member,
            finalPrice: quote.finalPrice,
            familyMemberCount: quote.familyMemberCount,
            quotientFamilial: quote.quotientFamilial,
            hasPassSport: quote.hasPassSport
        });

    } catch (error) {
        console.error(error);

        res.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        res.end(error.message);
    }
}


module.exports = {
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration,
    newRegistrationForm
};