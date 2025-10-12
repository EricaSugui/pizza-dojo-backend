"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProdutos = listarProdutos;
exports.criarProduto = criarProduto;
exports.atualizarProduto = atualizarProduto;
exports.deletarProduto = deletarProduto;
exports.atualizarDisponibilidadeProdutos = atualizarDisponibilidadeProdutos;
const data_1 = require("../mocks/data");
function listarProdutos() {
    atualizarDisponibilidadeProdutos();
    return data_1.produtos;
}
function criarProduto(data) {
    const novoProduto = {
        ...data,
        id: Date.now(),
        disponivel: true,
    };
    data_1.produtos.push(novoProduto);
    return novoProduto;
}
function atualizarProduto(id, dados) {
    const produto = data_1.produtos.find(p => p.id === id);
    if (!produto)
        return null;
    Object.assign(produto, dados);
    atualizarDisponibilidadeProdutos();
    return produto;
}
function deletarProduto(id) {
    const index = data_1.produtos.findIndex(p => p.id === id);
    if (index === -1)
        return false;
    data_1.produtos.splice(index, 1);
    return true;
}
// Função que atualiza disponibilidade com base no estoque
function atualizarDisponibilidadeProdutos() {
    data_1.produtos.forEach(produto => {
        produto.disponivel = produto.ingredientes.every(ingredienteId => {
            const ing = data_1.ingredientes.find(i => i.id === ingredienteId);
            return ing && ing.quantidade > 0;
        });
    });
}
