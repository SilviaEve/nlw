const express = require("express")
const server = express()
//configurar pasta publica
server.use(express.static("public"))

//utilizando tamplate engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//configurar caminhos da minha aplicação
// página inicial 
//req: Requisição
//res: Respostanpm 
server.get("/", function(req, res) {
    return res.render("index.html", { title: "Um titulo"})   
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})
//ligar o servidor
server.listen(3000)