import { Request, Response } from 'express';
import { getSaldoCaixa, listarTransacoes, registrarTransacao } from '../services/caixaService';

export function getTransacoes(req: Request, res: Response) {
  const transacoes = listarTransacoes();
  res.json(transacoes);
}

export function getSaldo(req: Request, res: Response) {
  const saldo = getSaldoCaixa();
  res.json({ saldo });
}

export function postDespesa(req: Request, res: Response) {
  const { valor, descricao, metodo } = req.body;
  if (typeof valor !== 'number' || valor <= 0 || !descricao || !metodo) {
    return res.status(400).json({ erro: 'Dados inválidos para registrar despesa. Campos obrigatórios: valor, descricao, metodo.' });
  }

  const transacao = registrarTransacao({ valor, descricao, metodo, tipo: 'saida' });

  res.status(201).json(transacao);
}