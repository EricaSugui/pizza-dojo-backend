import express from 'express';
// Tipos são importados separadamente
import type { Request, Response } from 'express';
import http from 'node:http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import adminRoutes from './routes/admin'; 
import clienteRoutes from './routes/cliente';
import { atualizarDisponibilidadeProdutos } from './services/produtosService';

const app = express();
const server = http.createServer(app);
export const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // ajuste conforme necessário
  },
});

// Middleware básico
app.use(express.json());

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('API da pizzaria rodando!');
});
app.use('/admin', adminRoutes);
app.use('/', clienteRoutes);

// Socket.IO para notificações em tempo real
io.on('connection', (socket: Socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Exemplo de evento
  socket.on('novaNotificacao', (data: any) => {
    io.emit('notificacao', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Atualiza a disponibilidade dos produtos com base nos ingredientes ao iniciar
atualizarDisponibilidadeProdutos();

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});