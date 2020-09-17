const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const server = new Koa();

server.use(bodyparser());

const produto = {
    id:'',
    nome:'',
    quantidadeDisponivelnode:'',
    valor: 0000,
    deletado: false,
};

const pedido = [];
pedido.push(produto); /*como o produto vai ser adicionado*/

/*Listar todos os produtos
Obter informações de um produto em particular
Adicionar um novo produto
Atualizar informações de um produto
Marcar um produto como deletado
Alterar a quantidade disponível de um produto

Criar um novo pedido	POST /orders
Obter informações de um pedido em particular	GET /orders/:id
Obter todos os produtos	GET /orders
Atualizar estado do pedido	PUT /orders/:id
Deletar um pedido	DELETE /orders/:id
Adicionar produtos na lista de produtos de um pedido	PUT /orders/:id

*/

/*(crud)
create
read
update
delete
*/

//Métodos HTTP
const rotas = (ctx) => {
    switch (ctx.method) {
        case 'GET':
            //
            break;
        case 'POST':
            //
            break;
        case 'PUT':
            //
        break;
    case 'DELETE':
            //
        break;
    default:
        //ERRR0
            break;
    } 
}

server.use(ctx => {
    rotas(ctx);
    //ctx.body = 'Rodando...';
});

server.listen(8081, () => console.log("Servidor rodando..."));



/*
*/