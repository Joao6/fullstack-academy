const fs = require('fs')

function readdirPromisse(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, content) => {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}

async function pegarConteudoDir(path) {
    try {
        const content = await readdirPromisse(path)
        console.log(content)
        console.log('======= Somente arquivos =========')

        content.map(file => {
            fs.stat(file, (err, stat) => {
                if (stat.isFile()) {
                    console.log(file)
                }
            })
        })
        
    } catch (error) {
        console.log(error)
    }
}

pegarConteudoDir('./')