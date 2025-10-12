"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProdutos = getProdutos;
exports.postProduto = postProduto;
exports.patchProduto = patchProduto;
exports.deleteProduto = deleteProduto;
const produtosService_1 = require("../services/produtosService");
function getProdutos(req, res) {
    res.json((0, produtosService_1.listarProdutos)());
}
function postProduto(req, res) {
    const { nome, preco, ingredientes } = req.body;
    if (!nome || preco === undefined || !ingredientes) {
        return res.status(400).json({ erro: 'Campos obrigatórios: nome, preco, ingredientes' });
    }
    const novo = (0, produtosService_1.criarProduto)({ nome, preco, ingredientes });
    res.status(201).json(novo);
}
function patchProduto(req, res) {
    const id = Number(req.params.id);
    const atualizado = (0, produtosService_1.atualizarProduto)(id, req.body);
    if (!atualizado)
        return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(atualizado);
}
function deleteProduto(req, res) {
    const id = Number(req.params.id);
    const ok = (0, produtosService_1.deletarProduto)(id);
    if (!ok)
        return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto removido com sucesso' });
}
