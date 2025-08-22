const express = require('express');
const router = express.Router();
const {
  criarCarro,
  buscarAllCarros,
  atualizarCarro,
  deletarCarro
} = require('../controllers/controller.js');

router.post('/cars', criarCarro);
router.get('/cars', buscarAllCarros);
router.put('/cars/:id', atualizarCarro);
router.delete('/cars/:id', deletarCarro);

module.exports = router;