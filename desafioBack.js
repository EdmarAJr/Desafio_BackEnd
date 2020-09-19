//-------------------------------------------------------------não mexer está pronto-----------------------------------------------------------
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
//-------------------------------------------------------------não mexer está pronto-----------------------------------------------------------

//apagar depois
const produto = {
    id:"123",
    nome:"",
    quantidadeDisponivel:"",
    valor: 0000,
    deletado: false,
};/*apagar depois*/

const produtos = [];

/*apagar depois*/produtos.push(produto); /*como o produto vai ser adicionado*/ 

/*(crud) Create Read Update Delete */
//-------------------------------------------------------------não mexer Produto está pronto-----------------------------------------------------------
//Métodos HTTP
const obterProdutos = () => {
    return produtos.filter((produto) => !produto.deletado);
};

const adicionarProdutos = (ctx) => {
    const body = ctx.request.body;

    if (!body.nome || !body.quantidadeDisponivel || !body.valor) {
        formatarErro(ctx, "Produto indisponível", 400);
        return;
    }

    const produto = {
        id: produtos.length + 1,
        nome: body.nome,
        quantidadeDisponivel: body.quantidadeDisponivel,
        valor: body.valor,
        deletado: false,
    };

    produtos.push(produto);
    
    return produto;
};

const atualizarProdutos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    if (!body.nome && !body.quantidadeDisponivel && !body.valor) {
        formatarErro(ctx, "Pedido mal-formatado(função atualizarProdutos)", 400);
    }
    if (id) {
        const produtoAtual = produtos[id - 1];
        if (produtoAtual) {
            const produtosAtualizado = {
                id: Number (id),
                nome: body.nome ? body.nome : produtoAtual.nome,
                quantidadeDisponivel: body.quantidadeDisponivel ? body.quantidadeDisponivel : produtoAtual.quantidadeDisponivel,
                valor: body.valor ? body.valor : produtoAtual.valor,
                deletado: produtoAtual.deletado,
            };
            pedido[id - 1] = produtosAtualizado;

            return produtosAtualizado;
        }    
    } else {
        formatarErro(ctx, "Pedido mal-formatado(função atualizarProdutos)", 400);
    }
};

const deletarProdutoDeProdutos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    
    if (typeof body.estado !== 'boolean') {
        formatarErro(ctx, "Pedido mal-formatado(função deletarProdutoDeProdutos)", 400);
        return;
    }

    if (id) {
        const produtoAtual = produtos[id - 1];
        if(produtoAtual) {
            const produtosAtualizado = {
                id: produtoAtual.id,
                nome: produtoAtual.nome,
                quantidadeDisponivel: produtoAtual.quantidadeDisponivel,
                valor: produtoAtual.valor,
                deletado: body.estado,
            };
           
            pedido[id - 1] = produtosAtualizado;

            return produtosAtualizado;
        }
    }
};

const rotasProdutos = (ctx, path) => {
    switch (ctx.method) {
        case "GET":
            const id = path[2];
            if (id) {
                const produtoAtual = produtos[id - 1];
                if (produtoAtual) {
                    formatarSucesso(ctx, produtoAtual);
                } else {
                    formatarErro(ctx, "Produto não encontrado (caso GET rotasProdutos)", 404)
                }
            } else {
                const produtos = obterProdutos();
                formatarSucesso(ctx, produtos);
            }
            break;
        case "POST":
            const produto = adicionarProdutos(ctx);
            if (produto) {
                formatarSucesso(ctx, produto, 201);
            }  
            break;
        case "PUT":
            const produtosAtualizado = atualizarProdutos(ctx);

            if (produtosAtualizado) {
                formatarSucesso(ctx, produtosAtualizado, 200);
            }
            break;
        case "DELETE":
            const produtoDeletado = deletarProdutoDeProdutos(ctx);
            
            if (produtoDeletado) {
                formatarSucesso(ctx, produtoDeletado, 200);
            }
            break;
        default:
            formatarErro(ctx, "Pedido mal-formatado (caso default produto deletado rotasProdutos)", 405)
            break;
    }
};
//-------------------------------------------------------------não mexer Produto está pronto-----------------------------------------------------------

//configurar pedidos 

const obterPedido = () => {
    return produtos.filter((produto) => !produto.deletado);
};

const adicionarPedido = (ctx) => {
    const body = ctx.request.body;

    if (!body.nome || !body.quantidadeDisponivel || !body.valor) {
        formatarErro(ctx, "Produto indisponível", 400);
        return;
    }

    const produto = {
        id: produtos.length + 1,
        nome: body.nome,
        quantidadeDisponivel: body.quantidadeDisponivel,
        valor: body.valor,
        deletado: false,
    };

    produtos.push(produto);
    
    return produto;
};

const atualizarPedido = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    if (!body.nome && !body.quantidadeDisponivel && !body.valor) {
        formatarErro(ctx, "Pedido mal-formatado(função atualizarProdutos)", 400);
    }
    if (id) {
        const produtoAtual = produtos[id - 1];
        if (produtoAtual) {
            const produtosAtualizado = {
                id: Number (id),
                nome: body.nome ? body.nome : produtoAtual.nome,
                quantidadeDisponivel: body.quantidadeDisponivel ? body.quantidadeDisponivel : produtoAtual.quantidadeDisponivel,
                valor: body.valor ? body.valor : produtoAtual.valor,
                deletado: produtoAtual.deletado,
            };
            pedido[id - 1] = produtosAtualizado;

            return produtosAtualizado;
        }    
    } else {
        formatarErro(ctx, "Pedido mal-formatado(função atualizarProdutos)", 400);
    }
};

const deletarPedidoDePedidos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    
    if (typeof body.estado !== 'boolean') {
        formatarErro(ctx, "Pedido mal-formatado(função deletarProdutoDeProdutos)", 400);
        return;
    }

    if (id) {
        const produtoAtual = produtos[id - 1];
        if(produtoAtual) {
            const produtosAtualizado = {
                id: produtoAtual.id,
                nome: produtoAtual.nome,
                quantidadeDisponivel: produtoAtual.quantidadeDisponivel,
                valor: produtoAtual.valor,
                deletado: body.estado,
            };
           
            pedido[id - 1] = produtosAtualizado;

            return produtosAtualizado;
        }
    }
};


const rotasPedidos = (ctx, path) => {
    switch (ctx.method) {
        case "GET":
            const id = path[2];
            if (id) {
                const produtoAtual = pedido[id - 1];
                if (produtoAtual) {
                    formatarSucesso(ctx, produtoAtual);
                } else {
                    formatarErro(ctx, "Produto não encontrado (caso GET rotasPedido)", 404)
                }
            } else {
                const pedido = obterPedido();
                formatarSucesso(ctx, pedido);
            }
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
            const produtoDeletado = deletarProdutoDoCarrinho(ctx);
            
            if (produtoDeletado) {
                formatarSucesso(ctx, produtoDeletado, 200);
            }
            break;
        default:
            formatarErro(ctx, "Pedido mal-formatado (caso default produto deletado rotasPedido)", 405)
            break;
    }
};

//-------------------------------------------------------------não mexer está pronto-----------------------------------------------------------
const rotas = (ctx) => {
    const path = ctx.url.split("/"); // ["", "produto / pedido", "1"]

    if (path[1] === "produto") {
        rotasProdutos(ctx, path);
    } else if (path[1] === "pedido") {
        rotasPedidos(ctx, path);
    } else {
        formatarErro(ctx, 'Opção inválida (rotas -no final)', 404)
    }
};


server.use((ctx) => {
    rotas(ctx);
    //ctx.body = "Rodando...";
});

server.listen(8081, () => console.log("Servidor rodando..."));
//-------------------------------------------------------------não mexer está pronto-----------------------------------------------------------