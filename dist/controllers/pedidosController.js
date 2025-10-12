"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPedidos = getPedidos;
exports.postPedido = postPedido;
exports.patchPedidoStatus = patchPedidoStatus;
const pedidosService_1 = require("../services/pedidosService");
const server_1 = require("../server"); // ⚠️ exporte io no server.ts
function getPedidos(req, res) {
    res.json((0, pedidosService_1.listarPedidos)());
}
function postPedido(req, res) {
    const pedido = (0, pedidosService_1.criarPedido)(req.body);
    if (!pedido)
        return res.status(400).json({ erro: 'Pedido inválido ou pizzaria fechada' });
    server_1.io.emit('pedido_novo', { pedidoId: pedido.id, clienteId: pedido.clienteId });
    res.status(201).json(pedido);
}
function patchPedidoStatus(req, res) {
    const id = Number(req.params.id);
    const { status } = req.body;
    const atualizado = (0, pedidosService_1.atualizarStatusPedido)(id, status);
    if (!atualizado)
        return res.status(404).json({ erro: 'Pedido não encontrado' });
    server_1.io.emit('pedido_status', { pedidoId: id, status });
    res.json(atualizado);
}
