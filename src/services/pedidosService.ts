import { pedidos, produtos, configPizzaria, ingredientes } from '../mocks/data';
import { Pedido, PedidoStatus } from '../types';
import { atualizarDisponibilidadeProdutos } from './produtosService';
import { registrarTransacao } from './caixaService';

let ultimoId = pedidos.reduce((maxId, item) => Math.max(item.id, maxId), 0);
const gerarProximoId = () => ++ultimoId;

type ResultadoCriacaoPedido = { pedido: Pedido | null; erro: string | null };

export function criarPedido(data: Omit<Pedido, 'id' | 'status' | 'horario' | 'total'>): ResultadoCriacaoPedido {
  // valida se pizzaria está aberta
  if (!configPizzaria.aberta) return { pedido: null, erro: 'A pizzaria está fechada no momento.' };

  // valida disponibilidade dos produtos
  for (const item of data.itens) {
    const produto = produtos.find(p => p.id === item.produtoId);
    if (!produto) {
      return { pedido: null, erro: `Produto com ID ${item.produtoId} não foi encontrado.` };
    }
    if (!produto.disponivel) {
      return { pedido: null, erro: `O produto "${produto.nome}" não está disponível no momento.` };
    }
  }

  // Calcula o total do pedido
  let totalPedido = 0;
  for (const item of data.itens) {
    const produto = produtos.find(p => p.id === item.produtoId)!;
    totalPedido += produto.preco * item.quantidade;
  }

  // Diminui o estoque de ingredientes
  for (const item of data.itens) {
    const produto = produtos.find(p => p.id === item.produtoId)!; // Sabemos que o produto existe pela validação anterior
    for (const ingredienteId of produto.ingredientes) {
      const ingrediente = ingredientes.find(i => i.id === ingredienteId);
      if (ingrediente) {
        // Assumindo que cada pizza consome 1 unidade de cada ingrediente
        ingrediente.quantidade -= item.quantidade;
      }
    }
  }

  const novo: Pedido = {
    ...data,
    id: gerarProximoId(),
    total: totalPedido,
    status: 'pendente',
    horario: new Date().toISOString()
  };
  pedidos.push(novo);

  // Atualiza a disponibilidade dos produtos após a baixa no estoque
  atualizarDisponibilidadeProdutos();
  return { pedido: novo, erro: null };
}

export function listarPedidos(): Pedido[] {
  return pedidos;
}

export function atualizarStatusPedido(id: number, status: PedidoStatus, motivo?: string): Pedido | null {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return null;

  // Se o pedido for aceito e o pagamento for PIX, registra no caixa
  if (status === 'aceito' && pedido.status === 'pendente' && pedido.formaPagamento === 'pix') {
    registrarTransacao({
      pedidoId: pedido.id,
      valor: pedido.total,
      tipo: 'entrada',
      metodo: 'pix',
      descricao: `Pagamento recebido via PIX para o pedido ${pedido.id}`
    });
  }

  // Se o pedido for finalizado e o pagamento for na retirada, registra no caixa
  if (status === 'finalizado' && pedido.status !== 'finalizado' && pedido.formaPagamento === 'retirada') {
    registrarTransacao({
      pedidoId: pedido.id,
      valor: pedido.total,
      tipo: 'entrada',
      metodo: 'retirada',
      descricao: `Pagamento recebido na retirada para o pedido ${pedido.id}`
    });
  }

  // Se o pedido for cancelado, devolve os ingredientes ao estoque
  if (status === 'cancelado' && pedido.status !== 'cancelado' && pedido.status !== 'finalizado') {
    // Adiciona o motivo do cancelamento, se houver
    if (motivo) {
      pedido.motivoCancelamento = motivo;
    }

    // E se o pagamento foi PIX e o pedido já havia sido aceito, estorna o valor do caixa
    if (pedido.formaPagamento === 'pix' && pedido.status !== 'pendente') {
      registrarTransacao({
        pedidoId: pedido.id,
        valor: pedido.total,
        tipo: 'saida', // Registra como uma saída (estorno)
        metodo: 'pix',
        descricao: `Estorno via PIX para o pedido ${pedido.id} cancelado`
      });
    }

    for (const item of pedido.itens) {
      const produto = produtos.find(p => p.id === item.produtoId);
      if (produto) {
        for (const ingredienteId of produto.ingredientes) {
          const ingrediente = ingredientes.find(i => i.id === ingredienteId);
          if (ingrediente) {
            ingrediente.quantidade += item.quantidade;
          }
        }
      }
    }
    atualizarDisponibilidadeProdutos();
  }

  pedido.status = status;
  return pedido;
}