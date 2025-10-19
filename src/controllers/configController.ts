import { Request, Response } from 'express';
import { getConfig, updateConfig } from '../services/configService';
import { io } from '../server';

export function getConfigPizzaria(req: Request, res: Response) {
  res.json(getConfig());
}

export function patchConfigPizzaria(req: Request, res: Response) {
  const atualizado = updateConfig(req.body);
  io.emit('sistema_aberto_fechado', { aberta: atualizado.aberta });
  res.json(atualizado);
}