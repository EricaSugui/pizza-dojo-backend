import io from "socket.io-client";

// A URL do seu backend
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`
----------------------------------------------------
Mock Client Conectado ao Servidor Socket.IO!
ID do Socket: ${socket.id}
Ouvindo por eventos...
----------------------------------------------------
  `);
});

// Ouve pelo evento de novo pedido
socket.on("pedido_novo", (data: any) => {
  console.log("✅ [NOVO PEDIDO] Recebido:");
  console.log(data);
  console.log("----------------------------------------------------");
});

// Ouve pela atualização de status de um pedido
socket.on("pedido_status", (data: any) => {
  console.log("🔄 [STATUS ATUALIZADO] Recebido:");
  console.log(data);

  // Lógica específica para quando um pedido é cancelado
  if (data.status === 'cancelado') {
    console.log(`\n🚨 ALERTA: O pedido ${data.pedidoId} foi cancelado!\n`);
  }

  console.log("----------------------------------------------------");
});

// Ouve pela mudança de status da pizzaria (aberta/fechada)
socket.on("sistema_aberto_fechado", (data: any) => {
  console.log(" pizzeria [ABERTA/FECHADA] Recebido:");
  console.log(data);
  console.log("----------------------------------------------------");
});

// Ouve pelo evento de produto indisponível
socket.on("produto_indisponivel", (data: any) => {
  console.log("❌ [PRODUTO INDISPONÍVEL] Recebido:");
  console.log(data);
  console.log("----------------------------------------------------");
});

socket.on("disconnect", () => {
  console.log("Cliente desconectado do servidor.");
});