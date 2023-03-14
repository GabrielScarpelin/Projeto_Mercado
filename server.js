const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const json = require('./compras.json');


nunjucks.configure('views', {
    autoescape: true,
    express: server
})
server.use(express.static('public'))
server.use(express.json())

server.get('/', (req, res, next) => {
    res.render('Caixa.html')
})

server.post('/finalizar', (req, res, next) => {
    res.render('CaixaRes.html')
})
server.get('/nf', (req, res, next) => {
    res.render('nf.html', json[0])
})


server.listen(3000)