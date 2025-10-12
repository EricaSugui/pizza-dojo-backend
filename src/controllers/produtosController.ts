import { Request, Response } from 'express';
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto } from '../services/produtosService';

export function getProdutos(req: Request, res: Response) {
  res.json(listarProdutos());
}

export function postProduto(req: Request, res: Response) {
  const { nome, preco, ingredientes } = req.body;
  if (!nome || preco === undefined || !ingredientes) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, preco, ingredientes' });
  }
  const novo = criarProduto({ nome, preco, ingredientes });
  res.status(201).json(novo);
}

export function patchProduto(req: Request, res: Response) {
  const id = Number(req.params.id);
  const atualizado = atualizarProduto(id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json(atualizado);
}

export function deleteProduto(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = deletarProduto(id);
  if (!ok) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json({ mensagem: 'Produto removido com sucesso' });
}