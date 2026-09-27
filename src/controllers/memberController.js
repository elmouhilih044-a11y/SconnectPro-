const memberService = require('../services/memberService');
const familyService = require('../services/familyService');
const render = require('../core/renderer');


async function getMembers(req, res) {
    try {
        const members = await memberService.getMembers();

        render(res, 'pages/members.ejs', {
            members
        });

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}


async function newMemberForm(req, res) {
    try {
        const families = await familyService.getFamilies();

        render(res, 'pages/member-form.ejs', {
            member: null,
            families
        });

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}


async function getMember(req, res) {
    try {
        const member = await memberService.getMember(req.params.id);

        if (!member) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Membre introuvable');
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(member));

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}


async function addMember(req, res) {
 
    let body = '';

    req.on('data', (part) => {
        body += part;
    });

    req.on('end', async () => {
        console.log('BODY RECEIVED:', body);

        try {
            const memberData = JSON.parse(body);

            console.log('PARSED MEMBER DATA:', memberData);

            const member = await memberService.addMember(memberData);

            console.log('MEMBER CREATED:', member);

            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(member));

        } catch (error) {
            console.error('ADD MEMBER ERROR:', error);

            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('Erreur serveur');
        }
    });
}


async function editMember(req, res) {
    let body = '';

    req.on('data', (part) => {
        body += part;
    });

    req.on('end', async () => {
        try {
            const memberData = JSON.parse(body);

            const member = await memberService.editMember(
                req.params.id,
                memberData
            );

            if (!member) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                return res.end('Membre introuvable');
            }

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(member));

        } catch (error) {
            console.error(error);

            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('Erreur serveur');
        }
    });
}


async function removeMember(req, res) {
    try {
        const member = await memberService.removeMember(req.params.id);

        if (!member) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            return res.end('Membre introuvable');
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(member));

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Erreur serveur');
    }
}


module.exports = {
    getMembers,
    newMemberForm,
    getMember,
    addMember,
    editMember,
    removeMember
};