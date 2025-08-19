const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar routes - caminho atualizado para car-api1
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Car API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rota padrão para documentação
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à Car API',
    endpoints: {
      health: '/health',
      cars: {
        create: 'POST /api/cars',
        list: 'GET /api/cars',
        byBrand: 'GET /api/cars/brand/:marca',
        byYear: 'GET /api/cars/year/:ano',
        byId: 'GET /api/cars/:id',
        update: 'PUT /api/cars/:id',
        delete: 'DELETE /api/cars/:id'
      }
    }
  });
});

// Middleware de erro
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota não encontrada
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;