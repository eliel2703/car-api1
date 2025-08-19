const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'funcionando',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'API Carros',
    endpoints: {
      health: '/health',
      cars: {
        criar: 'POST /api/cars',
        listar: 'GET /api/cars',
        atualizar: 'PUT /api/cars/:id',
        deletar: 'DELETE /api/cars/:id'
      }
    }
  });
});

app.use((error, req, res, next) => {
  console.error('Erro:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;