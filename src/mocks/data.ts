import { Ingrediente, Produto, Pedido, Cliente, ConfigPizzaria, TransacaoCaixa } from '../types';

export const ingredientes: Ingrediente[] = [
	{
		"id": 1,
		"nome": "Massa",
		"quantidade": 10
	},
	{
		"id": 2,
		"nome": "Queijo",
		"quantidade": 5
	},
	{
		"id": 3,
		"nome": "Molho de tomate",
		"quantidade": 5
	},
	{
		"nome": "Queijo Catupiry",
		"quantidade": 10,
		"id": 4
	},
	{
		"nome": "Queijo Gorgonzola",
		"quantidade": 10,
		"id": 5
	},
	{
		"nome": "Queijo Provolone",
		"quantidade": 10,
		"id": 6
	},
	{
		"nome": "Queijo Brie",
		"quantidade": 10,
		"id": 7
	},
	{
		"nome": "Rúcula",
		"quantidade": 5,
		"id": 8
	},
	{
		"nome": "Escarola",
		"quantidade": 5,
		"id": 9
	},
	{
		"nome": "Calabresa",
		"quantidade": 5,
		"id": 10
	}
];

export const produtos: Produto[] = [
  {
		"id": 1,
		"nome": "Pizza Mussarela",
		"preco": 40,
		"ingredientes": [
			1,
			2,
			3
		],
		"disponivel": true
	},
	{
		"id": 2,
		"nome": "Pizza Calabresa",
		"preco": 50,
		"ingredientes": [
			1,
			2,
			3,
			10
		],
		"disponivel": false
	},
	{
		"id": 3,
		"nome": "Pizza Escarola",
		"preco": 50,
		"ingredientes": [
			1,
			2,
			3,
			9
		],
		"disponivel": false
	},
	{
		"id": 4,
		"nome": "Pizza Quatro Queijos",
		"preco": 50,
		"ingredientes": [
			1,
			3,
			4,
			5,
			6,
			7
		],
		"disponivel": false
	}
];

export const pedidos: Pedido[] = [];

export const caixa: TransacaoCaixa[] = [];

export const clientes: Cliente[] = [
  {id: 1, nome: 'João Silva', telefone: '11999999999' }
];

export const configPizzaria: ConfigPizzaria = {
  aberta: true,
  horarioAbertura: '18:00',
  horarioFechamento: '23:30'
};