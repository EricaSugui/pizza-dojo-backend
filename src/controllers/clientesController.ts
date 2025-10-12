import { Request, Response } from 'express';
import { criarCliente, buscarCliente } from '../services/clientesService';

export function postCliente(req: Request, res: Response) {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
  const novo = criarCliente({ nome, telefone });
  res.status(201).json(novo);
}

export function getCliente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const cliente = buscarCliente(id);
  if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.json(cliente);
}