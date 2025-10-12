"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
const pedidosController_1 = require("../controllers/pedidosController");
const produtosController_1 = require("../controllers/produtosController");
const configController_1 = require("../controllers/configController");
const router = (0, express_1.Router)();
// Cliente
router.post('/clientes', clientesController_1.postCliente);
router.get('/clientes/:id', clientesController_1.getCliente);
// Pedido
router.post('/pedidos', pedidosController_1.postPedido);
// Produtos disponíveis
router.get('/produtos', produtosController_1.getProdutos);
// Configuração da pizzaria
router.get('/config', configController_1.getConfigPizzaria);
exports.default = router;
