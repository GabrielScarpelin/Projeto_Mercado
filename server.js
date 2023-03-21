const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const jsonProds = require('./produtos.json');
const fs = require('fs')

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
    const comprasJson = fs.readFileSync(__dirname+'/compras.json', {encoding: 'utf-8'})
    const comprasArray = JSON.parse(comprasJson)
    const id = comprasArray.length
    const totalPrice = calcularPrecoTotal(req.body.itensComprados)
    const quantidadeTotal = calcularQtdTotal(req.body.itensComprados)
    const date = new Date()
    comprasArray.push({
        id,
        cpf: req.body.cpf,
        paymentMethod: req.body.paymentMethod,
        nome: req.body,
        tel: req.body.tel,
        produtos: req.body.itensComprados,
        data: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        numeroNotaFiscal: numeroNota(),
        totalQuantity: quantidadeTotal,
        valorTotal: totalPrice,
    })
    fs.writeFileSync(__dirname+'/compras.json', JSON.stringify(comprasArray))
    res.send({idNota: id})
})



server.get('/finalMessage/:id', (req, res, next)=>{
    res.render('CaixaRes.html', {id: req.params.id})
})



server.get('/nf/:id', (req, res, next) => {
    const comprasJson = fs.readFileSync(__dirname+'/compras.json', {encoding: 'utf-8'})
    const comprasArray = JSON.parse(comprasJson)
    res.render('nf.html', comprasArray[req.params.id])
})

server.get('/prod/:codBarras', (req, res)=>{
    console.log(req.params.codBarras)
    const produto = jsonProds.find((value)=> value.id == req.params.codBarras)
    return res.send(produto)
})
function calcularQtdTotal(itensComprados){
    let quantidade = 0
    itensComprados.forEach(element => quantidade += Number(element.quantity))
    return quantidade
}
function calcularPrecoTotal(itensComprados){
    let valorTotal = 0
    itensComprados.forEach(element => valorTotal += Number(element.quantity) * Number(element.valor_unit))
    return valorTotal
}
function numeroNota(){
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 16; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}
server.listen(3000)