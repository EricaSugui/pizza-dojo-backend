import { Request, Response } from 'express';
import { criarPedido, listarPedidos, atualizarStatusPedido } from '../services/pedidosService';
import { io } from '../server'; // ⚠️ exporte io no server.ts

export function getPedidos(req: Request, res: Response) {
  res.json(listarPedidos());
}

export function postPedido(req: Request, res: Response) {
  const resultado = criarPedido(req.body);
  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  io.emit('pedido_novo', { pedidoId: resultado.pedido!.id, clienteId: resultado.pedido!.clienteId });
  res.status(201).json(resultado.pedido);
}

export function patchPedidoStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status, motivo } = req.body;
  const atualizado = atualizarStatusPedido(id, status, motivo);
  if (!atualizado) return res.status(404).json({ erro: 'Pedido não encontrado' });

  io.emit('pedido_status', { pedidoId: id, status, motivo: atualizado.motivoCancelamento });
  res.json(atualizado);
}