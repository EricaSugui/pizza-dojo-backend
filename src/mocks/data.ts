import { Ingrediente, Produto, Pedido, Cliente, ConfigPizzaria } from '../types';

export const ingredientes: Ingrediente[] = [
  { id: 1, nome: 'Massa', quantidade: 10 },
  { id: 2, nome: 'Queijo', quantidade: 5 },
  { id: 3, nome: 'Molho de tomate', quantidade: 5 }
];

export const produtos: Produto[] = [
  { id: 1, nome: 'Pizza Mussarela', preco: 40, ingredientes: [1, 2, 3], disponivel: true }
];

export const pedidos: Pedido[] = [];

export const clientes: Cliente[] = [];

export const configPizzaria: ConfigPizzaria = {
  aberta: true,
  horarioAbertura: '18:00',
  horarioFechamento: '23:30'
};