const activityService = require('../services/activityService');

async function getActivities(req, res) {
    try {
        const activities = await activityService.getActivities()
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(activities))
    } catch (error) {
        console.error(error)
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur')
    }
}
async function getActivity(req, res) {
    try {
        const activity = await activityService.getActivity(
            req.params.id
        )
        if (!activity) {
            res.writeHead(404, {
                'Content-Type':'text/plain'
            })
            return res.end('Activité introuvable')
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(activity))
    } catch (error) {
        console.error(error)
        res.writeHead(500, {
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur')
    }
}
async function addActivity(req, res) {
    let body = '';
    req.on('data',(part) => {
        body += part
    });
    req.on('end', async () => {
        try {
            const activityData = JSON.parse(body);
            const activity = await activityService.addActivity(activityData);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(activity))
        } catch (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type':'text/plain'
            });
            res.end('Erreur serveur');
        }
    });
}

async function editActivity(req, res) {
    let body = '';

    req.on('data', (part) => {
        body += part;
    });

    req.on('end', async () => {
        try {
            const activityData = JSON.parse(body);
            const activity =
                await activityService.editActivity(
                    req.params.id,activityData);

            if (!activity) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                return res.end('Activité introuvable');
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(activity))
        } catch (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type':'text/plain'
            });
            res.end('Erreur serveur')
        }
    });
}
async function removeActivity(req,res) {
    try {
        const activity =
            await activityService.removeActivity(
                req.params.id)

        if (!activity) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Activité introuvable');
        }

        res.writeHead(200, {
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(activity));
    } catch (error) {
        console.error(error)
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}

module.exports = {
    getActivities,
    getActivity,
    addActivity,
    editActivity,
    removeActivity
};