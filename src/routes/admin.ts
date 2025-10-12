import { Router } from 'express';
import { getProdutos, postProduto, patchProduto, deleteProduto } from '../controllers/produtosController';
import { getIngredientes, postIngrediente, patchIngrediente, deleteIngrediente } from '../controllers/ingredientesController';
import { getPedidos, patchPedidoStatus } from '../controllers/pedidosController';
import { getConfigPizzaria, patchConfigPizzaria } from '../controllers/configController';

const router = Router();

// Produtos
router.get('/produtos', getProdutos);
router.post('/produtos', postProduto);
router.patch('/produtos/:id', patchProduto);
router.delete('/produtos/:id', deleteProduto);

// Ingredientes
router.get('/ingredientes', getIngredientes);
router.post('/ingredientes', postIngrediente);
router.patch('/ingredientes/:id', patchIngrediente);
router.delete('/ingredientes/:id', deleteIngrediente);

// Pedidos
router.get('/pedidos', getPedidos);
router.patch('/pedidos/:id', patchPedidoStatus);

// Config
router.get('/config', getConfigPizzaria);
router.patch('/config', patchConfigPizzaria);


export default router;