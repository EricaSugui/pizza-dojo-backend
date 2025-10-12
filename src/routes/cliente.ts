import { Router } from 'express';
import { getCliente, postCliente } from '../controllers/clientesController';
import { postPedido } from '../controllers/pedidosController';
import { getProdutos } from '../controllers/produtosController';
import { getConfigPizzaria } from '../controllers/configController';

const router = Router();

// Cliente
router.post('/clientes', postCliente);
router.get('/clientes/:id', getCliente);

// Pedido
router.post('/pedidos', postPedido);

// Produtos disponíveis
router.get('/produtos', getProdutos);

// Configuração da pizzaria
router.get('/config', getConfigPizzaria);

export default router;