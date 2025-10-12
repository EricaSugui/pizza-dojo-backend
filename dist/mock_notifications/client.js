"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const socket = (0, socket_io_client_1.default)("http://localhost:3000");
socket.on("connect", () => {
    console.log("Conectado ao servidor!");
    // Envia uma notificação de teste
    socket.emit("novaNotificacao", { mensagem: "Pedido saiu para entrega!" });
});
socket.on("notificacao", (data) => {
    console.log("Notificação recebida:", data);
});
