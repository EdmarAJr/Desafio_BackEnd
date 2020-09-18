const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const server = new Koa();

server.use(bodyparser());

const formatarSucesso = (ctx, dados, status = 200) => {
    ctx.status = status;
    ctx.body = {
        status: 'sucesso',
        dados: dados,
    };
};

const formatarErro = (ctx, mensagem, status = 404) => {
    ctx.status = status;
    ctx.body = {
        status: "erro",
        dados: { 
            mensagem: mensagem,
        },
    }; 
};

const produto = {
    id:"123",
    nome:"",
    quantidadeDisponivel:"",
    valor: 0000,
    deletado: false,
};

const pedido = [];
pedido.push(produto); /*como o produto vai ser adicionado*/

/*(crud) Create Read Update Delete */

//Métodos HTTP
const rotasProdutos = (ctx) => {
    switch (ctx.method) {
        case "GET":
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
        default:
            //ERR0
            break;
    }
};

const obterPedido = () => {
    return pedido;
};

const adicionarProduto = (ctx) => {
    const body = ctx.request.body;

    if (!body.nome || !body.quantidadeDisponivel || !body.valor) {
        formatarErro(ctx, "Produto indisponível", 400);
        return;
    }

    const produto = {
        id: "", //ver pq id não gera automaticamente
        nome: body.nome,
        quantidadeDisponivel: body.quantidadeDisponivel,
        valor: body.valor,
        deletado: false,
    };

    pedido.push(produto);
    
    return produto;
};

const atualizarCarrinho = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    if (!body.nome && !body.quantidadeDisponivel && !body.valor) {
        formatarErro(ctx, "Seu carrinho está vazio", 400);
    }
    if (id) {
        const produtoAtual = pedido[id];
        if (produtoAtual) {
            const pedidoAtualizado = {
                id: Number (id),
                nome: body.nome ? body.nome : produtoAtual.nome,
                quantidadeDisponivel: body.quantidadeDisponivel ? body.quantidadeDisponivel : produtoAtual.quantidadeDisponivel,
                valor: body.valor ? body.valor : produtoAtual.valor,
                deletado: produtoAtual.deletado,
            };
            pedido[id - 1] = pedidoAtualizado;

            return pedidoAtualizado;
        }    
    } else {
        formatarErro(ctx, "Seu carrinho está vazio", 400);
    }
};

const rotasPedidos = (ctx) => {
    switch (ctx.method) {
        case "GET":
            const pedido = obterPedido();
            formatarSucesso(ctx, pedido);
            break;
        case "POST":
            const produto = adicionarProduto(ctx);
            if (produto) {
                formatarSucesso(ctx, produto, 201);
            }  
            break;
        case "PUT":
            const pedidoAtualizado = atualizarCarrinho(ctx);

            if (pedidoAtualizado) {
                formatarSucesso(ctx, pedidoAtualizado, 200);
            }
            break;
        case "DELETE":
            break;
        default:
            formatarErro(ctx, "Produto não disponível Teste1", 405)
            break;
    }
};


const rotas = (ctx) => {
    const path = ctx.url.split("/"); // ["", "produto / pedido", "1"]

    if (path[1] === "produto") {
        rotasProdutos(ctx);
    } else if (path[1] === "pedido") {
        rotasPedidos(ctx);
    } else {
        //erro
    }
};



server.use((ctx) => {
    rotas(ctx);
    //ctx.body = "Rodando...";
});

server.listen(8081, () => console.log("Servidor rodando..."));



/*
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