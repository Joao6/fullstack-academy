const fs = require('fs')
/*const path = './'
fs.readdir(path, (err, files) => {
  if(err){
    console.log('ocorreu um erro.')
  }else{
    console.log(files)
  }
})*/

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

readdirPromisse('./').then((files) => {
    console.log(files)
})