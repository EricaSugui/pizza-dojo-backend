import { Router } from 'express';
import { getProdutos, postProduto, patchProduto, deleteProduto } from '../controllers/produtosController';
import { getIngredientes, postIngrediente, patchIngrediente, deleteIngrediente } from '../controllers/ingredientesController';
import { getPedidos, patchPedidoStatus } from '../controllers/pedidosController';
import { getConfigPizzaria, patchConfigPizzaria } from '../controllers/configController';
import { getCliente, getClientes, patchCliente, postCliente } from '../controllers/clientesController';
import { getSaldo, getTransacoes, postDespesa } from '../controllers/caixaController';

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

// Cliente
router.get('/clientes', getClientes);
router.get('/clientes/:id', getCliente);
router.post('/clientes', postCliente);
router.patch('/clientes/:id', patchCliente);

// Pedidos
router.get('/pedidos', getPedidos);
router.patch('/pedidos/:id', patchPedidoStatus);

// Config
router.get('/config', getConfigPizzaria);
router.patch('/config', patchConfigPizzaria);

// Caixa
router.get('/caixa', getTransacoes);
router.get('/caixa/saldo', getSaldo);
router.post('/caixa/despesa', postDespesa);


export default router;