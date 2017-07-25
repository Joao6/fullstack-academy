const fs = require('fs')

function readdirPromisse(path){
    return new Promise((resolve, reject) =>{
        fs.readdir(path, (err, content) =>{
            if(err){
                reject(err)
            }else{
                resolve(content)
            }
        })
    })
}

async function pegarConteudoDir(path){
    try {
        const content = await readdirPromisse(path)
        console.log(content)
    } catch (error) {
        console.log(error)
    }
}

pegarConteudoDir('./')