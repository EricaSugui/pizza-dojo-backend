import { produtos, ingredientes } from '../mocks/data';
import { Produto } from '../types';
import { io } from '../server';

export function listarProdutos(): Produto[] {
    atualizarDisponibilidadeProdutos();
  return produtos;
}
let ultimoId = produtos.reduce((maxId, item) => Math.max(item.id, maxId), 0);
const gerarProximoId = () => ++ultimoId;

export function criarProduto(data: Omit<Produto, 'id' | 'disponivel'>): Produto {
  const novoProduto: Produto = {
    id: gerarProximoId(),
    ...data,
    disponivel: true,
  };
  produtos.push(novoProduto);
  return novoProduto;
}

export function atualizarProduto(id: number, dados: Partial<Produto>): Produto | null {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return null;
  Object.assign(produto, dados);
  atualizarDisponibilidadeProdutos();
  return produto;
}

export function deletarProduto(id: number): boolean {
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
}

// Função que atualiza disponibilidade com base no estoque
export function atualizarDisponibilidadeProdutos() {
  produtos.forEach(produto => {
    const estavaDisponivel = produto.disponivel;

    const estaDisponivel = produto.ingredientes.every(ingredienteId => {
      const ing = ingredientes.find(i => i.id === ingredienteId);
      return ing && ing.quantidade > 0;
    });

    produto.disponivel = estaDisponivel;

    // Se o produto estava disponível e agora não está mais, notifica via Socket.IO
    if (estavaDisponivel && !estaDisponivel) {
      io.emit('produto_indisponivel', {
        produtoId: produto.id,
        nome: produto.nome,
      });
    }
  });
}