import { configPizzaria } from '../mocks/data';
import { ConfigPizzaria } from '../types';

export function getConfig(): ConfigPizzaria {
  return configPizzaria;
}

export function updateConfig(data: Partial<ConfigPizzaria>): ConfigPizzaria {
  Object.assign(configPizzaria, data);
  return configPizzaria;
}