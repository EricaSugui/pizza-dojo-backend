export interface Ingrediente {
  id: number;
  nome: string;
  quantidade: number; // em gramas, ml, unidades etc.
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  ingredientes: number[]; // lista de IDs dos ingredientes
  disponivel: boolean;
}

export interface PedidoItem {
  produtoId: number;
  quantidade: number;
}

export type PedidoStatus = 'pendente' | 'aceito' | 'em_preparo' | 'finalizado' | 'cancelado';

export interface Pedido {
  id: number;
  clienteId: number;
  itens: Array<{ produtoId: number; quantidade: number }>;
  status: 'pendente' | 'aceito' | 'em_preparo' | 'finalizado' | 'cancelado';
  formaPagamento: 'pix' | 'retirada';
  horario: string;
}

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
}

export interface ConfigPizzaria {
  aberta: boolean;
  horarioAbertura: string;
  horarioFechamento: string;
}