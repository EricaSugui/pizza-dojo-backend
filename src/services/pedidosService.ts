import { pedidos, produtos, configPizzaria } from '../mocks/data';
import { Pedido, PedidoStatus } from '../types';

export function criarPedido(data: Omit<Pedido, 'id' | 'status' | 'horario'>): Pedido | null {
  // valida se pizzaria está aberta
  if (!configPizzaria.aberta) return null;

  // valida disponibilidade dos produtos
  for (const item of data.itens) {
    const produto = produtos.find(p => p.id === item.produtoId);
    if (!produto || !produto.disponivel) return null;
  }

  const novo: Pedido = {
    ...data,
    id: Date.now(),
    status: 'pendente',
    horario: new Date().toISOString()
  };
  pedidos.push(novo);
  return novo;
}

export function listarPedidos(): Pedido[] {
  return pedidos;
}

export function atualizarStatusPedido(id: number, status: PedidoStatus): Pedido | null {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return null;
  pedido.status = status;
  return pedido;
}