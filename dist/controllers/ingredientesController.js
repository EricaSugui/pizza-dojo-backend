"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIngredientes = getIngredientes;
exports.postIngrediente = postIngrediente;
exports.patchIngrediente = patchIngrediente;
exports.deleteIngrediente = deleteIngrediente;
const ingredientesService_1 = require("../services/ingredientesService");
function getIngredientes(req, res) {
    res.json((0, ingredientesService_1.listarIngredientes)());
}
function postIngrediente(req, res) {
    const { nome, quantidade } = req.body;
    if (!nome || quantidade === undefined) {
        return res.status(400).json({ erro: 'Nome e quantidade são obrigatórios' });
    }
    const novo = (0, ingredientesService_1.criarIngrediente)({ nome, quantidade });
    res.status(201).json(novo);
}
function patchIngrediente(req, res) {
    const id = Number(req.params.id);
    const atualizado = (0, ingredientesService_1.atualizarIngrediente)(id, req.body);
    if (!atualizado)
        return res.status(404).json({ erro: 'Ingrediente não encontrado' });
    res.json(atualizado);
}
function deleteIngrediente(req, res) {
    const id = Number(req.params.id);
    const ok = (0, ingredientesService_1.deletarIngrediente)(id);
    if (!ok)
        return res.status(404).json({ erro: 'Ingrediente não encontrado' });
    res.json({ mensagem: 'Ingrediente removido' });
}
