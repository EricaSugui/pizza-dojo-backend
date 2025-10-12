import  io  from "socket.io-client";
import { Socket } from "socket.io-client";

const socket: typeof Socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado ao servidor!");

  // Envia uma notificação de teste
  socket.emit("novaNotificacao", { mensagem: "Pedido saiu para entrega!" });
});

socket.on("notificacao", (data: any) => {
  console.log("Notificação recebida:", data);
});