"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarIngredientes = listarIngredientes;
exports.criarIngrediente = criarIngrediente;
exports.atualizarIngrediente = atualizarIngrediente;
exports.deletarIngrediente = deletarIngrediente;
const data_1 = require("../mocks/data");
const produtosService_1 = require("./produtosService");
function listarIngredientes() {
    return data_1.ingredientes;
}
function criarIngrediente(data) {
    const novo = {
        ...data,
        id: Date.now()
    };
    data_1.ingredientes.push(novo);
    (0, produtosService_1.atualizarDisponibilidadeProdutos)();
    return novo;
}
function atualizarIngrediente(id, dados) {
    const ingrediente = data_1.ingredientes.find(i => i.id === id);
    if (!ingrediente)
        return null;
    Object.assign(ingrediente, dados);
    (0, produtosService_1.atualizarDisponibilidadeProdutos)();
    return ingrediente;
}
function deletarIngrediente(id) {
    const index = data_1.ingredientes.findIndex(i => i.id === id);
    if (index === -1)
        return false;
    data_1.ingredientes.splice(index, 1);
    (0, produtosService_1.atualizarDisponibilidadeProdutos)();
    return true;
}
