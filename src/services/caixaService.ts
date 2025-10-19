import { caixa } from '../mocks/data';
import { TransacaoCaixa } from '../types';

let ultimoId = caixa.reduce((maxId, item) => Math.max(item.id, maxId), 0);
const gerarProximoId = () => ++ultimoId;

export function registrarTransacao(data: Omit<TransacaoCaixa, 'id' | 'data'>): TransacaoCaixa {
  const novaTransacao: TransacaoCaixa = {
    ...data,
    id: gerarProximoId(),
    data: new Date().toISOString(),
  };
  caixa.push(novaTransacao);
  return novaTransacao;
}

export function listarTransacoes(): TransacaoCaixa[] {
  return caixa;
}

export function getSaldoCaixa(): number {
  return caixa.reduce((saldo, transacao) => {
    if (transacao.tipo === 'entrada') {
      return saldo + transacao.valor;
    }
    return saldo - transacao.valor; // Saída (estorno)
  }, 0);
}