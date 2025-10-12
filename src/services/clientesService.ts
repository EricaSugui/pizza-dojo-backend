import { clientes } from '../mocks/data';
import { Cliente } from '../types';

export function criarCliente(data: Omit<Cliente, 'id'>): Cliente {
  const novo: Cliente = { ...data, id: Date.now() };
  clientes.push(novo);
  return novo;
}

export function buscarCliente(id: number): Cliente | null {
  return clientes.find(c => c.id === id) || null;
}