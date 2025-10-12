"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigPizzaria = getConfigPizzaria;
exports.patchConfigPizzaria = patchConfigPizzaria;
const configService_1 = require("../services/configService");
// import { io } from '../server';
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const socket = (0, socket_io_client_1.default)("http://localhost:3000");
function getConfigPizzaria(req, res) {
    res.json((0, configService_1.getConfig)());
}
function patchConfigPizzaria(req, res) {
    const atualizado = (0, configService_1.updateConfig)(req.body);
    socket.emit('sistema_aberto_fechado', { aberta: atualizado.aberta });
    res.json(atualizado);
}
