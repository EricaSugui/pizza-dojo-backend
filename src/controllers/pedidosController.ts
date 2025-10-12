import { Request, Response } from 'express';
import { criarPedido, listarPedidos, atualizarStatusPedido } from '../services/pedidosService';
import { io } from '../server'; // ⚠️ exporte io no server.ts

export function getPedidos(req: Request, res: Response) {
  res.json(listarPedidos());
}

export function postPedido(req: Request, res: Response) {
  const pedido = criarPedido(req.body);
  if (!pedido) return res.status(400).json({ erro: 'Pedido inválido ou pizzaria fechada' });

  io.emit('pedido_novo', { pedidoId: pedido.id, clienteId: pedido.clienteId });
  res.status(201).json(pedido);
}

export function patchPedidoStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body;
  const atualizado = atualizarStatusPedido(id, status);
  if (!atualizado) return res.status(404).json({ erro: 'Pedido não encontrado' });

  io.emit('pedido_status', { pedidoId: id, status });
  res.json(atualizado);
}