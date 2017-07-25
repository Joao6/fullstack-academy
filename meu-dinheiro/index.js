const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

const path = require('path')

//definindo onde estão os templates
app.set('views', path.join(__dirname, 'views'))
//tipo de template
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/calculadora', (req, res) => {
    res.render('calculadora')
})

app.listen(port, () => console.log('Server running in port '+port))