const fs= require('fs')
const path= require('path')

function serveStaticFile(req, res){
    const filePath= path.join(__dirname,'../../public',req.url.replace('/public', ''))
    fs.access(filePath, fs.constants.F_OK,(err)=>{
        if(err){
            res.writeHead(404,{
                'Content-Type':'text/plain; charset=utf-8'
            })
            return res.end('Fichier introuvable')
        }
        res.writeHead(200,{
            'Content-Type': getContentType(filePath)
        })
        const stream= fs.createReadStream(filePath);
        stream.pipe(res)
        stream.on('error',()=>{
            res.writeHead(500,{
                'Content-Type':'text/plain; charset=utf-8'
            })
            res.end('Erreur de lecture du fichier')
        })
    })
}

function getContentType(filePath) {
    const extension= path.extname(filePath)

    if(extension === '.css'){
        return 'text/css'
    }

    if(extension === '.js'){
        return 'application/javascript'
    }

    if(extension === '.html'){
        return 'text/html'
    }

    if(extension === '.png'){
        return 'image/png'
    }

    if(extension === '.jpg' || extension === '.jpeg'){
        return 'image/jpeg'
    }

    if(extension === '.svg'){
        return 'image/svg+xml'
    }
    return 'application/octet-stream'
}
module.exports= serveStaticFile