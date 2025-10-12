"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configPizzaria = exports.clientes = exports.pedidos = exports.produtos = exports.ingredientes = void 0;
exports.ingredientes = [
    { id: 1, nome: 'Massa', quantidade: 10 },
    { id: 2, nome: 'Queijo', quantidade: 5 },
    { id: 3, nome: 'Molho de tomate', quantidade: 5 }
];
exports.produtos = [
    { id: 1, nome: 'Pizza Mussarela', preco: 40, ingredientes: [1, 2, 3], disponivel: true }
];
exports.pedidos = [];
exports.clientes = [];
exports.configPizzaria = {
    aberta: true,
    horarioAbertura: '18:00',
    horarioFechamento: '23:30'
};
