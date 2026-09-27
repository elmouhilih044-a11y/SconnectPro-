const activityService = require('../services/activityService');
const render = require('../core/renderer');
const facilityService = require('../services/facilityService');
async function getActivities(req, res){
    try{
        const activities= await activityService.getActivities()
       render(res, 'pages/activities.ejs', { activities, query: {} });
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur')
    }
}
async function getActivity(req, res){
    try{
        const activity= await activityService.getActivity(req.params.id)
        if(!activity){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            })
            return res.end('Activité introuvable')
        }
        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(activity))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur')
    }
}
async function addActivity(req, res){
    let body = '';
    req.on('data',(part)=> {
        body += part
    });
    req.on('end', async()=> {
        try{
            const activityData = JSON.parse(body);
            const activity = await activityService.addActivity(activityData);
            res.writeHead(201,{
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(activity))
        } catch (error){
            console.error(error)
            res.writeHead(400,{
                'Content-Type': 'text/plain'
            })
            res.end(error.message)
        }
    });
}

async function editActivity(req, res){
    let body = '';

    req.on('data',(part) => {
        body += part;
    });

    req.on('end', async () => {
        try{
            const activityData= JSON.parse(body);
            const activity=
                await activityService.editActivity(
                    req.params.id,activityData);

            if(!activity) {
                res.writeHead(404,{
                    'Content-Type':'text/plain'
                });
                return res.end('Activité introuvable');
            }
            res.writeHead(200, {
                'Content-Type':'application/json'
            });
            res.end(JSON.stringify(activity))
        }catch (error) {
            console.error(error)
            res.writeHead(400,{
                'Content-Type':'text/plain'
            })
            res.end(error.message);
        }
    });
}
async function removeActivity(req,res){
    try{
        const activity= await activityService.removeActivity(req.params.id)

        if(!activity){
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            });
            return res.end('Activité introuvable');
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(activity));
    }catch(error) {
        console.error(error)
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function newActivityForm(req, res) {
    try {
        const facilities = await facilityService.getFacilities();

        render(res, 'pages/activity-form.ejs', {
            activity: null,
            facilities
        });
    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}

module.exports= {
    getActivities,
    getActivity,
    addActivity,
    editActivity,
    removeActivity,
    newActivityForm
}