"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produtosController_1 = require("../controllers/produtosController");
const ingredientesController_1 = require("../controllers/ingredientesController");
const pedidosController_1 = require("../controllers/pedidosController");
const configController_1 = require("../controllers/configController");
const router = (0, express_1.Router)();
// Produtos
router.get('/produtos', produtosController_1.getProdutos);
router.post('/produtos', produtosController_1.postProduto);
router.patch('/produtos/:id', produtosController_1.patchProduto);
router.delete('/produtos/:id', produtosController_1.deleteProduto);
// Ingredientes
router.get('/ingredientes', ingredientesController_1.getIngredientes);
router.post('/ingredientes', ingredientesController_1.postIngrediente);
router.patch('/ingredientes/:id', ingredientesController_1.patchIngrediente);
router.delete('/ingredientes/:id', ingredientesController_1.deleteIngrediente);
// Pedidos
router.get('/pedidos', pedidosController_1.getPedidos);
router.patch('/pedidos/:id', pedidosController_1.patchPedidoStatus);
// Config
router.get('/config', configController_1.getConfigPizzaria);
router.patch('/config', configController_1.patchConfigPizzaria);
exports.default = router;
