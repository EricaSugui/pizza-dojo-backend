import { Request, Response } from 'express';
import { criarCliente, buscarCliente, listarClientes, atualizarCliente } from '../services/clientesService';

export function getClientes(req: Request, res: Response) {
  res.json(listarClientes());
}

export function getCliente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const cliente = buscarCliente(id);
  if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.json(cliente);
}

export function postCliente(req: Request, res: Response) {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
  // const novo = criarCliente({ nome, telefone });
  const novo = criarCliente(req.body);

  res.status(201).json(novo);
}

export function patchCliente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const clienteAtualizado = atualizarCliente(id, req.body);
  if (!clienteAtualizado) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.json(clienteAtualizado);
}