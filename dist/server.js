"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const admin_1 = __importDefault(require("./routes/admin"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // ajuste conforme necessário
    },
});
// Middleware básico
app.use(express_1.default.json());
// Rota de teste
app.get('/', (req, res) => {
    res.send('API da pizzaria rodando!');
});
app.use('/admin', admin_1.default);
app.use('/', cliente_1.default);
// Socket.IO para notificações em tempo real
exports.io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);
    // Exemplo de evento
    socket.on('novaNotificacao', (data) => {
        exports.io.emit('notificacao', data);
    });
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});
// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
