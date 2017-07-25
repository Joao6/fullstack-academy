const express = require('express')
const app = express()

const port = 3000

app.get('/somar', (request, response) => {
    console.log(request.query)    
    if (request.query && request.query.num1 && request.query.num2) {        
        let soma = parseInt(request.query.num1) + parseInt(request.query.num2)
        response.status(200).send('A soma é: '+soma)
    }else{
        response.status(200).send('Informe dois parâmetros para serem somados!')
    }        
})

app.listen(port, () => console.log('Server running in port '+port))