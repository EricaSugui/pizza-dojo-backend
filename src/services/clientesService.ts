import { clientes } from '../mocks/data';
import { Cliente } from '../types';

export function listarClientes(): Cliente[] {
  return clientes;
}

let ultimoId = clientes.reduce((maxId, item) => Math.max(item.id, maxId), 0);
const gerarProximoId = () => ++ultimoId;

export function criarCliente(data: Omit<Cliente, 'id'>): Cliente {
  const novo: Cliente = { id: gerarProximoId(), ...data };
  clientes.push(novo);
  return novo;
}

export function buscarCliente(id: number): Cliente | null {
  return clientes.find(c => c.id === id) || null;
}

export function atualizarCliente(id: number, data: Partial<Omit<Cliente, 'id'>>): Cliente | null {
  const cliente = buscarCliente(id);
  if (!cliente) return null;
  Object.assign(cliente, data);
  return cliente;
}