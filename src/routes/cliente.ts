import { Router } from 'express';
import { getCliente, getClientes, patchCliente, postCliente } from '../controllers/clientesController';
import { postPedido } from '../controllers/pedidosController';
import { getProdutos } from '../controllers/produtosController';
import { getConfigPizzaria } from '../controllers/configController';

const router = Router();

// Cliente
router.get('/clientes', getClientes);
router.get('/clientes/:id', getCliente);
router.post('/clientes', postCliente);
router.patch('/clientes/:id', patchCliente);

// Pedido
router.post('/pedidos', postPedido);

// Produtos disponíveis
router.get('/produtos', getProdutos);

// Configuração da pizzaria
router.get('/config', getConfigPizzaria);

export default router;