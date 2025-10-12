"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPedido = criarPedido;
exports.listarPedidos = listarPedidos;
exports.atualizarStatusPedido = atualizarStatusPedido;
const data_1 = require("../mocks/data");
function criarPedido(data) {
    // valida se pizzaria está aberta
    if (!data_1.configPizzaria.aberta)
        return null;
    // valida disponibilidade dos produtos
    for (const item of data.itens) {
        const produto = data_1.produtos.find(p => p.id === item.produtoId);
        if (!produto || !produto.disponivel)
            return null;
    }
    const novo = {
        ...data,
        id: Date.now(),
        status: 'pendente',
        horario: new Date().toISOString()
    };
    data_1.pedidos.push(novo);
    return novo;
}
function listarPedidos() {
    return data_1.pedidos;
}
function atualizarStatusPedido(id, status) {
    const pedido = data_1.pedidos.find(p => p.id === id);
    if (!pedido)
        return null;
    pedido.status = status;
    return pedido;
}
