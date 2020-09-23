/*Nícolas, obrigado pela ajuda! Eu fiz o que pude e credito que por hora esse foi o meu limite técnico.
Perdoe-me por não conseguir concluir o desafio como na Unidade1. Dei o meu melhor :)
Se possível, na hora de corrigir os feedBack, por favor, indique-me onde eu posso melhorar e aprimorar o código.
Não consegui compreender muito bem a implementação da função adicionarProdutos e atualizarPedidos. Tentei, mas não consegui.
*/
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

const produtos = [];
const pedidos = [];
const estoque = [];

/*(crud) Create Read Update Delete */
//Métodos HTTP
const obterProdutos = () => {
    return produtos.filter((produto) => !produto.deletado);
};

const adicionarProdutos = (ctx) => {
    const body = ctx.request.body;

    if (!body.nome || !body.quantidade || !body.valor) {
        formatarErro(ctx, "Pedido mal-formatado(função adicionarProdutos", 400);
        return;
    }
    const produto = {
        id: produtos.length + 1,
        nome: body.nome,
        quantidade: body.quantidade,
        valor: body.valor,
        deletado: false,
    };
    produtos.push(produto);

    const produtoNoEstoque = estoque[produto.id - 1]; //ver se isso está certo depois
    if (produtoNoEstoque) {
      if (produtoNoEstoque.quantidade >= produto.quantidade) {
        estoque[produto.id - 1].quantidade = estoque[produto.id - 1].quantidade - produto.quantidade;
        const pedidoAtual = pedidos[id_pedido - 1];
        if (pedidoAtual) {
          const produtoJaConstaNoPedido = pedidoAtual.produtos.filter((pdt) => pdt.id === produto.id).length > 0;
          if (produtoJaConstaNoPedido) {
            for (let i = 0; i < pedidoAtual.produtos.length; i++) {
              if (pedidoAtual.produtos[i].id === produto.id) {
                  pedidoAtual.produtos.splice(i, 1, {
                  nome: produto.nome,
                  id: produto.id,
                  quantidade: pedidoAtual.produtos[i].quantidade + produto.quantidade,
                });
              }
            }
          } else {
            pedidoAtual.produtos.push(produto);
          }
         
          pedidoAtual.valor_total =
            pedidoAtual.valor_total + produto.valor * produto.quantidade;
          pedidos[pedidoAtual.id - 1] = pedidoAtual;
        }
      }
    } 
    return produto;
};

const atualizarProdutos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    if (!body.nome && !body.quantidade && !body.valor) {
        formatarErro(ctx, "Pedido mal-formatado(função atualizarProdutos)", 400);
        return;
    }
    if (id) {
        const produtoAtual = produtos[id - 1];
        if (produtoAtual) {
            const produtosAtualizado = {
                id: Number (id),
                nome: body.nome ? body.nome : produtoAtual.nome,
                quantidade: body.quantidade ? body.quantidade : produtoAtual.quantidade,
                valor: body.valor ? body.valor : produtoAtual.valor,
                deletado: produtoAtual.deletado,
            };
            produtos[id - 1] = produtosAtualizado;

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
           
            produtos[id - 1] = produtosAtualizado;

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

const obterPedidos = () => {
    return pedidos.filter((pedido) => !pedido.deletado && !pedido.incompleto);
};

const adicionarPedidos = (ctx) => {
        const body = ctx.request.body;
    
        if (!body.idCliente) {
            formatarErro(ctx, "Pedido mal-formatado(função adicionarPedidos", 400);
            return;
        }
        const pedido = {
            id: pedidos.length + 1,
            idCliente: body.idCliente,
            produtos: [],
            estado: "incompleto",
            valor: 0,
            deletado: false,
        };
        pedidos.push(pedido);
           
        return pedido;
    };

const atualizarPedidos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    if (body.estado && body.produtos) { 
        formatarErro(ctx, "Pedido mal-formatado(função atualizarPedidos)", 400);
        return;
    }
   
    if (id) { //verifica o estado ou produto
        const pedidoAtual = pedidos[id - 1];
        if (pedidoAtual) {
            const pedidoAtualizado = {       
                id: Number (id),
                produtos: body.produtos ? body.produtos : pedidoAtual.produtos, 
                idCliente: body.id ? body.id : pedidoAtual.id,
                estado: body.estado ? body.estado : pedidoAtual.estado, 
                valor: body.pedido ? body.pedido : pedidoAtual.valor, 
                deletado: pedidoAtual.deletado,
            };
            pedidos[id - 1] = pedidoAtualizado;

            return pedidoAtualizado;
        }
            pedidos[id - 1] = pedidoAtualizado;

            return pedidoAtualizado;
            
    } else {
        formatarErro(ctx, "Pedido mal-formatado(função atualizarPedidos)", 400);
    }
};

const deletarPedidoDePedidos = (ctx) => {
    const id = ctx.url.split("/")[2];
    const body = ctx.request.body;
    
    if (typeof body.deletado !== 'boolean') {
        formatarErro(ctx, "Pedido mal-formatado(função deletarProdutoDeProdutos)", 400);
        return;
    }

    if (id) {
        const pedidoAtual = pedidos[id - 1];
        if(pedidoAtual) {
            const pedidosAtualizado = {
                id: pedidoAtual.id,
                id: Number (id), //rever
                produtos: body.pedido ? body.pedido : pedidoAtual.produtos, //rever
                nome: pedidoAtual.nome, //rever
                idCliente: pedidoAtual.id, //rever
                estado: body.estado ? body.estado : pedidoAtual.estado, 
                quantidade: pedidoAtual.quantidade, //rever
                valor: body.pedido ? body.pedido : pedidoAtual.valor, //rever
                deletado: body.deletado,
            };
           
            
            

            pedidos[id - 1] = pedidosAtualizado;

            return pedidosAtualizado;
        }
    }

};

const rotasPedidos = (ctx, path) => {
    switch (ctx.method) {
        case "GET":
            const id = path[2];
            if (id) {
                const pedidoAtual = pedidos[id - 1];
                if (pedidoAtual) {
                    formatarSucesso(ctx, pedidoAtual);
                } else {
                    formatarErro(ctx, "Pedido não encontrado (caso GET rotasPedidos)", 404)
                }
            } else {
                const pedidos = obterPedidos();
                formatarSucesso(ctx, pedidos);
            }
            break;
        case "POST":
            const pedido = adicionarPedidos(ctx);
            if (pedido) {
                formatarSucesso(ctx, pedidos, 201);
            }  
            break;
        case "PUT":
            const pedidoAtualizado = atualizarPedidos(ctx);

            if (pedidoAtualizado) {
                formatarSucesso(ctx, pedidoAtualizado, 200);
            }
            break;
        case "DELETE":
            const pedidoDeletado = deletarPedidoDePedidos(ctx);
            
            if (pedidoDeletado) {
                formatarSucesso(ctx, pedidoDeletado, 200);
            }
            break;
        default:
            formatarErro(ctx, "Pedido mal-formatado (caso default pedido deletado rotasPedido)", 405)
            break;
    }
};


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
    
});

server.listen(8081, () => console.log("Servidor rodando..."));
