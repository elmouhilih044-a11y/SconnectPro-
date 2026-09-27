const facilityService = require('../services/facilityService');
const render = require('../core/renderer');
async function getFacilities(req, res){
    try {
        const facilities= await facilityService.getFacilities();
       render(res, 'pages/facilities.ejs', { facilities });
    } catch (error){
        console.error(error);
        res.writeHead(500,{
            'Content-Type': 'text/plain'
        })
        res.end('Erreur serveur');
    }
}
async function getFacility(req, res) {

    try {

        const facility =
            await facilityService.getFacility(req.params.id);


        if (!facility) {

            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end(
                'Installation introuvable'
            );
        }


        render(
            res,
            'pages/facility-detail.ejs',
            {
                facility
            }
        );


    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}
async function addFacility(req,res){
    let body= ''
    req.on('data',(part) => {
        body += part
    });
    req.on('end', async() => {
        try {
            const facilityData = JSON.parse(body)
            const facility = await facilityService.addFacility(facilityData)
            res.writeHead(201, {
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify(facility))
        } catch (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type':'text/plain'
            })
            res.end('Erreur serveur');
        }
    });
}
async function editFacility(req, res){
    let body = '';
    req.on('data',(part)=> {
        body += part
    });
    req.on('end', async ()=> {
        try {
            const facilityData= JSON.parse(body)
            const facility= await facilityService.editFacility(
                req.params.id,facilityData);
            if (!facility){
                res.writeHead(404,{
                    'Content-Type':'text/plain'
                });
                return res.end('Facility introuvable');
            }
            res.writeHead(200,{
                'Content-Type':'application/json'
            });
            res.end(JSON.stringify(facility));
        } catch (error){
            console.error(error)
            res.writeHead(500,{
                'Content-Type': 'text/plain'
            })
            res.end('Erreur serveur')
        }
    });
}

async function removeFacility(req,res){
    try {
        const facility= await facilityService.removeFacility(req.params.id)
        if (!facility){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            })
            return res.end('Facility introuvable');
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(facility))
    } catch (error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function newFacilityForm(req, res) {
    try {
        render(res, 'pages/facility-form.ejs', {
            facility: null
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
    getFacilities,
    getFacility,
    addFacility,
    editFacility,
    removeFacility,
    newFacilityForm
};