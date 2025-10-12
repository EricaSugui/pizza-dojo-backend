"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCliente = postCliente;
exports.getCliente = getCliente;
const clientesService_1 = require("../services/clientesService");
function postCliente(req, res) {
    const { nome, telefone } = req.body;
    if (!nome || !telefone)
        return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
    const novo = (0, clientesService_1.criarCliente)({ nome, telefone });
    res.status(201).json(novo);
}
function getCliente(req, res) {
    const id = Number(req.params.id);
    const cliente = (0, clientesService_1.buscarCliente)(id);
    if (!cliente)
        return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
}
