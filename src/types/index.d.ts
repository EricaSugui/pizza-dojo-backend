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

export type PedidoStatus = 'pendente' | 'aceito' | 'em_preparo' | 'pronto_para_retirada' | 'em_rota_de_entrega' | 'finalizado' | 'cancelado';

export interface Pedido {
  id: number;
  clienteId: number; // O nome da propriedade é clienteId
  itens: Array<{ produtoId: number; quantidade: number }>;
  total: number;
  status: PedidoStatus;
  formaPagamento: 'pix' | 'retirada';
  horario: string;
  motivoCancelamento?: string;
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

export interface TransacaoCaixa {
  id: number;
  pedidoId?: number;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  metodo: 'pix' | 'dinheiro' | 'debito' | 'retirada';
  data: string;
}