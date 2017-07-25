const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient
const mongoUri = 'mongodb://joaopedro:ZGhK8WSIG29pNNbw@meu-dinheiro-shard-00-00-imvlw.mongodb.net:27017,meu-dinheiro-shard-00-01-imvlw.mongodb.net:27017,meu-dinheiro-shard-00-02-imvlw.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=meu-dinheiro-shard-0&authSource=admin'

app.use(express.static('public'))

const path = require('path')

//definindo onde estão os templates
app.set('views', path.join(__dirname, 'views'))
//tipo de template
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

const calculoJuros = (p, i, n) => p * Math.pow(1 + i, n)

app.get('/calculadora', (req, res) => {
    const resultado = {
        calculado: false
    }
    if (req.query.valorInicial && req.query.taxa && req.query.tempo) {
        resultado.calculado = true;
        resultado.total = calculoJuros(
            parseFloat(req.query.valorInicial),
            parseFloat(req.query.taxa) / 100,
            parseInt(req.query.tempo)
        )
        const tempo = parseInt(req.query.tempo)
        const vetor = Array.from(new Array(tempo), (tempo, i) => i + 1)

        resultado.evolucao = vetor.map(valor => {
            return calculoJuros(
                parseFloat(req.query.valorInicial),
                parseFloat(req.query.taxa) / 100,
                parseInt(valor)
            )
        })
    }
    res.render('calculadora', { resultado })
})

const findAll = (db, collectionName) => {
    const collection = db.collection(collectionName)
    const cursor = collection.find({})
    const documents = []
    return new Promise((resolve, reject) => {
        cursor.forEach(
            (doc) => documents.push(doc),
            () => resolve(documents)
        )
    })
}

const insert = (db, collectionName, document) => {
    const collection = db.collection(collectionName)
    return new Promise((resolve, reject) => {
        collection.insert(document, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })

}

app.get('/operacoes', async (req, res) => {
    let operacoes = await findAll(app.db, 'operacoes')
    
    if(req.query.filtro){
        if(req.query.filtro === 'entrada'){
            operacoes = operacoes.filter(operacao => operacao.valor > 0)
        }else if(req.query.filtro === 'saida'){
            operacoes = operacoes.filter(operacao => operacao.valor < 0)
        }
    }
    res.render('operacoes', { operacoes })
})

app.get('/nova-operacao', (req, res) => res.render('nova-operacao'))
app.post('/nova-operacao', async (req, res) => {
    const operacao = {
        descricao: req.body.descricao,
        valor: parseFloat(req.body.valor)
    }
    const newOperacao = await insert(app.db, 'operacoes', operacao)
    res.redirect('/operacoes')
})

app.get('/contas', async (req, res) => {
    const contas = await findAll(app.db, 'contas')
    res.render('contas', {contas})
})

app.get('/nova-conta', (req,res) => res.render('nova-conta'))
app.post('/nova-conta', async (req, res) => {
    const conta = {
        descricao: req.body.descricao,
        valorEstimado: parseFloat(req.body.valor),
        diaVencimento: parseInt(req.body.vencimento)
    }
    const newConta = await insert(app.db, 'contas', conta)
    res.redirect('contas')
})

MongoClient.connect(mongoUri, (err, db) => {
    if (err) {
        return
    } else {
        app.db = db
        app.listen(port, () => console.log('Server running in port ' + port))
    }
})