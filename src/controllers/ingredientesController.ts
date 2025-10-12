import { Request, Response } from 'express';
import { listarIngredientes, criarIngrediente, atualizarIngrediente, deletarIngrediente } from '../services/ingredientesService';

export function getIngredientes(req: Request, res: Response) {
  res.json(listarIngredientes());
}

export function postIngrediente(req: Request, res: Response) {
  const { nome, quantidade } = req.body;
  if (!nome || quantidade === undefined) {
    return res.status(400).json({ erro: 'Nome e quantidade são obrigatórios' });
  }
  const novo = criarIngrediente({ nome, quantidade });
  res.status(201).json(novo);
}

export function patchIngrediente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const atualizado = atualizarIngrediente(id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Ingrediente não encontrado' });
  res.json(atualizado);
}

export function deleteIngrediente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = deletarIngrediente(id);
  if (!ok) return res.status(404).json({ erro: 'Ingrediente não encontrado' });
  res.json({ mensagem: 'Ingrediente removido' });
}
