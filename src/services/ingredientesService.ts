import { ingredientes } from '../mocks/data';
import { Ingrediente } from '../types';
import { atualizarDisponibilidadeProdutos } from './produtosService';

let ultimoId = ingredientes.reduce((maxId, item) => Math.max(item.id, maxId), 0);
const gerarProximoId = () => ++ultimoId;

export function listarIngredientes(): Ingrediente[] {
  return ingredientes;
}

export function criarIngrediente(data: Omit<Ingrediente, 'id'>): Ingrediente {
  const novo: Ingrediente = {
    id: gerarProximoId(),
    ...data,
  };
  ingredientes.push(novo);
  atualizarDisponibilidadeProdutos();
  return novo;
}

export function atualizarIngrediente(id: number, dados: Partial<Ingrediente>): Ingrediente | null {
  const ingrediente = ingredientes.find(i => i.id === id);
  if (!ingrediente) return null;
  Object.assign(ingrediente, dados);
  atualizarDisponibilidadeProdutos();
  return ingrediente;
}

export function deletarIngrediente(id: number): boolean {
  const index = ingredientes.findIndex(i => i.id === id);
  if (index === -1) return false;
  ingredientes.splice(index, 1);
  atualizarDisponibilidadeProdutos();
  return true;
}
