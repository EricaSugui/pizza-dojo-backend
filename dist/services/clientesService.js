"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarCliente = criarCliente;
exports.buscarCliente = buscarCliente;
const data_1 = require("../mocks/data");
function criarCliente(data) {
    const novo = { ...data, id: Date.now() };
    data_1.clientes.push(novo);
    return novo;
}
function buscarCliente(id) {
    return data_1.clientes.find(c => c.id === id) || null;
}
