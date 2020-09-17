const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const server = new Koa();

server.use(bodyparser());

server.use(ctx => {
    ctx.body = 'Rodando...';
});

server.listen(8081, () => console.log("Servidor rodando..."));



/*
let produto = {
    id:'',
    nome:'',
    quantidadeDisponivelnode:'',
    valor: 0000,
    deletado: false,
};
const pedido = [];*/