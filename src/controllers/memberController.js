const memberService=require('../services/memberService');
async function getMembers(req,res){
    try{
        const members=await memberService.getMembers()
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(members))
    }catch(error){
        console.error(error);
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}
async function getMember(req,res){
    try{
        const member=await memberService.getMember(req.params.id);
        if(!member){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            return res.end('Membre introuvable');
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(member))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}

async function addMember(req,res){
    let body='';
    req.on('data',(part)=>{
        body+=part;
    });
    req.on('end',async()=>{
        try{
            const memberData=JSON.parse(body);
            const member=await memberService.addMember(memberData)
            res.writeHead(201,{
                'Content-Type':'application/json'
            });
            res.end(JSON.stringify(member))
        }catch(error){
            console.error(error)
            res.writeHead(500,{
                'Content-Type':'text/plain'
            });
            res.end('Erreur serveur');
        }
    });
}
async function editMember(req,res){
    let body='';
    req.on('data',(part)=>{
        body+=part
    });
    req.on('end',async()=>{
        try{
            const memberData=JSON.parse(body)
            const member=await memberService.editMember(req.params.id,memberData)
            if(!member){
                res.writeHead(404,{
                    'Content-Type':'text/plain'
                });
                return res.end('Membre introuvable');
            }
            res.writeHead(200,{
                'Content-Type':'application/json'
            });
            res.end(JSON.stringify(member))
        }catch(error){
            console.error(error)
            res.writeHead(500,{
                'Content-Type':'text/plain'
            });
            res.end('Erreur serveur');
        }
    });
}
async function removeMember(req,res){
    try{
        const member=await memberService.removeMember(req.params.id)
        if(!member){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            return res.end('Membre introuvable')
        }
        res.writeHead(200,{
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(member))
    }catch(error){
        console.error(error)
        res.writeHead(500,{
            'Content-Type':'text/plain'
        });
        res.end('Erreur serveur');
    }
}

module.exports={
    getMembers,
    getMember,
    addMember,
    editMember,
    removeMember
};